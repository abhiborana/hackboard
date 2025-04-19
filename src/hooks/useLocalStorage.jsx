import { produce } from "immer";
import { useCallback, useEffect, useSyncExternalStore } from "react";

const getType = (key) => Object.prototype.toString.call(key).slice(8, -1);

function dispatchStorageEvent(key, newValue) {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
}

const setLocalStorageItem = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeLocalStorageItem = (key) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const getLocalStorageItem = (key) => {
  return window.localStorage.getItem(key);
};

const useLocalStorageSubscribe = (callback) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getLocalStorageServerSnapshot = () => {
  return null;
};

const useLocalStorage = (key, initialValue) => {
  const getSnapshot = () => getLocalStorageItem(key);

  const store = useSyncExternalStore(
    useLocalStorageSubscribe,
    getSnapshot,
    getLocalStorageServerSnapshot,
  );

  const setState = useCallback(
    (v, cb) => {
      try {
        const currentState = JSON.parse(store);

        if (!currentState) return setLocalStorageItem(key, initialValue);

        const nextState = produce(currentState, (draft) => {
          if (typeof v === "function") {
            v(draft);
          } else {
            return v;
          }
        });
        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
        if (getType(cb) === "Function") cb();
      } catch (e) {
        console.error(e);
      }
    },
    [key, initialValue, store],
  );

  useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== "undefined"
    ) {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ? JSON.parse(store) : initialValue, setState];
};

export default useLocalStorage;
