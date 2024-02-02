"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be minimum of 3 characters long."),
  password: z
    .string()
    .min(6, "Password should be minimum of 6 characters long."),
});

type FormData = z.infer<typeof formSchema>;

export function CreateWorkspaceForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/join-workspace", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const jsonData = await res.json();
      if (res.status === 400) {
        throw Error(jsonData.message);
      }

      toast.success(jsonData.message);
      router.push("/workspace");
      router.refresh();
    } catch (e) {
      // @ts-ignore
      toast.error(e.message);
    }
  }

  return (
    <div className={cn("grid gap-6 w-full")}>
      <Text variant="h1">
        Create or Join existing workspace to manage your tasks.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} className=" max-w-md">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="roopaish"
              type="username"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              {...register("username")}
            />
            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder=""
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create/Re-join workspace
          </Button>
        </div>
      </form>
    </div>
  );
}
