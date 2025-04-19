"use client";

import { addLikes, subtractLikes } from "@/actions";
import useLocalStorage from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const ProjectCard = ({ submission }) => {
  const [liked, setLiked] = useLocalStorage("liked", []);
  const [likeCount, setLikeCount] = useState(submission.likes);

  const handleToggleLike = async () => {
    if (liked.includes(submission.id)) {
      await addLikes(submission.id);
      setLiked(liked.filter((id) => id !== submission.id));
      setLikeCount((prev) => prev - 1);
    } else {
      await subtractLikes(submission.id);
      setLiked([...liked, submission.id]);
      setLikeCount((prev) => prev + 1);
    }
  };

  return (
    <Card
      className={
        "p-4 flex flex-col gap-2 group aspect-square overflow-hidden hover:scale-105 transition-all duration-500 ease-in-out relative z-0"
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
      <Link
        target="_blank"
        href={`/${submission.url}`}
        className="text-base font-semibold line-clamp-1 group-hover:underline"
      >
        {submission.title}
      </Link>
      <p className="text-xs text-muted-foreground line-clamp-3">
        {submission.description}
      </p>
      <span className="text-xs text-muted-foreground line-clamp-1">
        By {submission.team_name}
      </span>
      <Button
        size="sm"
        variant={"secondary"}
        className={"absolute z-10 top-2 right-2 flex items-center gap-1"}
        onClick={handleToggleLike}
      >
        <HeartIcon
          className={cn(
            "inline-flex",
            liked.includes(submission.id) ? "fill-rose-500 text-rose-500" : "",
          )}
        />
        <span className="text-xs text-muted-foreground">{likeCount}</span>
      </Button>
    </Card>
  );
};

export default ProjectCard;
