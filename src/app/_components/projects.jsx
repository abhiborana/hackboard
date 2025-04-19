import ProjectCard from "@/components/molecules/project-card";
import { Card } from "@/components/ui/card";
import { supabaseClient } from "@/supabase";
import { AlertCircleIcon, ServerCrashIcon } from "lucide-react";

const Projects = async () => {
  const { data: projects, error } = await supabaseClient
    .from("submissions")
    .select("*");

  return error ? (
    <Card
      className={
        "p-4 flex flex-col gap-2 cursor-pointer justify-center items-center text-center aspect-square overflow-hidden hover:scale-105 transition-all duration-500 ease-in-out"
      }
    >
      <ServerCrashIcon className="h-8 w-8 text-muted-foreground" />
      <h3 className="text-lg font-semibold">Error fetching projects</h3>
      <p className="text-sm text-muted-foreground line-clamp-3">
        {error.message}
      </p>
    </Card>
  ) : projects.length ? (
    projects.map((project) => (
      <ProjectCard submission={project} key={project.id} />
    ))
  ) : (
    <Card
      className={
        "p-4 flex flex-col gap-2 cursor-pointer justify-center items-center text-center aspect-square overflow-hidden hover:scale-105 transition-all duration-500 ease-in-out"
      }
    >
      <AlertCircleIcon className="h-8 w-8 text-muted-foreground" />
      <h3 className="text-lg font-semibold">No projects found</h3>
      <p className="text-sm text-muted-foreground">
        Add some projects to showcase your work.
      </p>
    </Card>
  );
};

export default Projects;
