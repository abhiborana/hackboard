"use client";

import { getSupaProjects } from "@/actions";
import AddProject from "@/components/molecules/add-project";
import ProjectCard from "@/components/molecules/project-card";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useHackboard from "@/store";
import { AlertCircleIcon, ServerCrashIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const sortTypes = ["likes", "created_at", "title"];

const Hackboard = () => {
  const [status, setStatus] = useState(null);
  const dispatch = useHackboard((state) => state.dispatch);
  const projects = useHackboard((state) => state.projects);
  const [sortType, setSortType] = useState("likes");
  const [query, setQuery] = useState("");

  const getProjects = async () => {
    setStatus("loading");
    const projects = await getSupaProjects();
    setStatus("success");
    dispatch({
      type: "SET_STATE",
      payload: { projects },
    });
  };

  const filteredProjects = useMemo(() => {
    let resp;
    if (!query) resp = projects;
    else
      resp = projects.filter((project) => {
        const { title, team_name, url } = project;
        return (
          title.toLowerCase().includes(query.toLowerCase()) ||
          team_name.toLowerCase().includes(query.toLowerCase()) ||
          url.toLowerCase().includes(query.toLowerCase())
        );
      });
    if (sortType === "likes") {
      return [...resp].sort((a, b) => b.likes - a.likes);
    } else if (sortType === "created_at") {
      return [...resp].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
      });
    }
    return [...resp].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
  }, [query, projects, sortType]);

  useEffect(() => {
    if (status === "loading" || projects.length) return;
    getProjects();
  }, [status, projects]);
  return (
    <div className="flex flex-col gap-2 w-full h-full px-4 md:px-0">
      <div className="flex justify-between w-full items-start gap-2 flex-wrap">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Hackboard</h1>
          <p className="text-base text-muted-foreground">
            Hackboard is a platform to showcase your next.js hackathon projects.
            You can create a project, and share it with the world.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search a Project, Team name, or URL"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={"sm:max-w-xs"}
          />
          <Select
            onValueChange={setSortType}
            defaultValue={sortType}
            className="capitalize"
          >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder={sortType} value={sortType} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By</SelectLabel>
                {sortTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-6">
        <AddProject refetch={getProjects} />
        {status === "loading" ? (
          <Skeleton className={"w-full aspect-square"} />
        ) : status === "error" ? (
          <Card
            className={
              "p-4 flex flex-col gap-2 cursor-pointer justify-center items-center text-center aspect-square overflow-hidden hover:scale-105 transition-all duration-500 ease-in-out"
            }
          >
            <ServerCrashIcon className="h-8 w-8 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Error fetching projects</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">
              There was an error fetching projects. Please try again later.
            </p>
          </Card>
        ) : filteredProjects.length ? (
          filteredProjects.map((project) => (
            <ProjectCard submission={project} key={project.id} />
          ))
        ) : (
          <Card
            className={
              "p-4 flex flex-col gap-2 cursor-pointer justify-center bg-muted items-center text-center aspect-square overflow-hidden hover:scale-105 transition-all duration-500 ease-in-out"
            }
          >
            <AlertCircleIcon className="h-8 w-8 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No projects found</h3>
            <p className="text-sm text-muted-foreground">
              Add some projects to showcase your work.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Hackboard;
