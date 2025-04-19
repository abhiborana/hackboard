"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";

const ProjectCard = ({ submission }) => {
  return (
    <Link href={submission.url} target="_blank">
      <Card
        className={
          "p-4 flex flex-col gap-2 group cursor-pointer aspect-square overflow-hidden hover:scale-105 transition-all duration-500 ease-in-out"
        }
      >
        <div className="relative w-full aspect-video rounded-md overflow-hidden shrink-0">
          <Image
            src={submission.image}
            alt={submission.title}
            onError={(e) => {
              e.target.onerror = null; // prevents looping
              e.target.src = `https://api.dicebear.com/9.x/glass/svg?seed=${submission.title}`; // fallback image
            }}
            unoptimized
            fill
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-base font-semibold line-clamp-1 group-hover:underline">
          {submission.title}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-3">
          {submission.description}
        </p>
        <span className="text-xs text-muted-foreground line-clamp-1">
          By {submission.team_name}
        </span>
      </Card>
    </Link>
  );
};

export default ProjectCard;
