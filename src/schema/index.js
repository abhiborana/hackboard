import { z } from "zod";

export const addProjectSchema = z.object({
  title: z.string().nullish(),
  description: z.string().nullish(),
  image: z.string().url({ message: "Image URL is invalid" }).nullish(),
  url: z.string().url({ message: "URL is invalid" }),
  team_name: z.string().min(1, { message: "Enter a team name" }),
});
