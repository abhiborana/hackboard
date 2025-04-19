"use server";

export const getMetadata = async (url) => {
  let resp = null;
  try {
    resp = await fetch(`https://metatags.io/api/hello?url=${url}`, {
      method: "GET",
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error fetching metadata:", error);
    resp = {
      error: "Failed to fetch metadata",
    };
  }
  return resp;
};
