"use client";

import { getMetadata } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addProjectSchema } from "@/schema";
import { supabaseClient } from "@/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Loading from "../atoms/loading";
import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const AddProject = ({ refetch }) => {
  const router = useRouter();
  const [metadata, setMetadata] = useState(false);

  const form = useForm({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      url: "",
      team_name: "",
    },
  });

  const handleBlur = async (e) => {
    if (!e.target.value) return;
    setMetadata("loading");
    const {
      error,
      title,
      description,
      image,
      favicon,
      responseUrl: url,
    } = await getMetadata(encodeURIComponent(e.target.value));
    if (error) {
      setMetadata(false);
      return toast.error("Failed to fetch metadata");
    }
    setMetadata(true);
    form.setValue("title", title || "");
    form.setValue("description", description || "");
    form.setValue("image", image || favicon || "");
    form.setValue("url", url || e.target.value);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const { error } = await supabaseClient
      .from("submissions")
      .insert(data)
      .select("*")
      .single();
    if (error) {
      console.error("Error inserting data:", error);
      return toast.error("Failed to add project");
    }
    toast.success("Project added successfully");
    setMetadata(false);
    form.reset();
    document.getElementById("close").click();
    refetch();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={
            "p-4 flex flex-col gap-2 cursor-pointer justify-center items-center text-center aspect-square overflow-hidden hover:scale-105 transition-all duration-500 ease-in-out"
          }
        >
          <PlusIcon className="h-8 w-8 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Add a new project</h3>
          <p className="text-sm text-muted-foreground">
            Click here to add a new project to your profile. You can add a
            title,
          </p>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new project</DialogTitle>
          <DialogDescription>
            Enter the URL & team name of your project.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project URL</FormLabel>
                  <FormControl>
                    <div className="flex w-full items-center gap-2 justify-between">
                      <Input
                        placeholder="https://hackboard.vercel.app"
                        {...field}
                        onBlur={(e) => {
                          field.onBlur(e);
                          handleBlur(e);
                        }}
                      />
                      {metadata === "loading" ? (
                        <Loading />
                      ) : metadata ? (
                        <CheckIcon className="h-4 w-4 text-green-500" />
                      ) : null}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="team_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team name</FormLabel>
                  <FormControl>
                    <Input placeholder="Abhishek Borana" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  id="close"
                  variant={"outline"}
                  onClick={() => {
                    setMetadata(false);
                    form.reset();
                  }}
                  type="button"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={!metadata || metadata === "loading"}
                type="submit"
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
