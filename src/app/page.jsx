import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

const Hackboard = () => {
  return (
    <div className="flex flex-col gap-2 w-full h-full ">
      <h1 className="text-3xl font-bold tracking-tight">Hackboard</h1>
      <p className="text-base text-muted-foreground">
        Hackboard is a platform to showcase your next.js hackathon projects. You
        can create a project, add a description, and share it with the world.
      </p>
      <Separator />
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-5 py-6">
        {[].map((submission) => {
          return (
            <Card
              key={submission.id}
              className={
                "p-4 flex flex-col gap-2 cursor-pointer aspect-square overflow-hidden hover:scale-105 transition-all duration-500 ease-in-out"
              }
            >
              <div className="relative w-full aspect-video rounded-md overflow-hidden shrink-0">
                <Image
                  src={submission.image}
                  alt={submission.title}
                  unoptimized
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
              <Link
                href={submission.url}
                target="_blank"
                className="text-lg font-semibold line-clamp-1"
              >
                {submission.title}
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {submission.description}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Hackboard;
