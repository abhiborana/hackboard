"use server";

import { supabase } from "@/supabase";

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

export const getSupaProjects = async () => {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .range(0, 100);
  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
  return projects;
};

export const saveProject = async (data) => {
  const { error } = await supabase
    .from("projects")
    .insert(data)
    .select("*")
    .single();
  return error;
};

export const addLikes = async (id) => {
  const { data } = await supabase
    .from("projects")
    .select("likes")
    .eq("id", id)
    .single();
  await supabase
    .from("projects")
    .update({ likes: data.likes + 1 })
    .eq("id", id);
};

export const subtractLikes = async (id) => {
  const { data } = await supabase
    .from("projects")
    .select("likes")
    .eq("id", id)
    .single();
  await supabase
    .from("projects")
    .update({ likes: data.likes - 1 })
    .eq("id", id);
};
