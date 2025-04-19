import AddProject from "@/components/molecules/add-project";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Projects from "./_components/projects";

const Hackboard = () => {
  return (
    <div className="flex flex-col gap-2 w-full h-full px-4 md:px-0">
      <h1 className="text-3xl font-bold tracking-tight">Hackboard</h1>
      <p className="text-base text-muted-foreground">
        Hackboard is a platform to showcase your next.js hackathon projects. You
        can create a project, add a description, and share it with the world.
      </p>
      <Separator />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-6">
        <AddProject />
        <Suspense fallback={<Skeleton className={"w-full aspect-square"} />}>
          <Projects />
        </Suspense>
      </div>
    </div>
  );
};

export default Hackboard;
