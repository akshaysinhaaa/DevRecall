import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        repoUrl: z.string().url(),
        projectName: z.string().min(1),
        githubToken: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("hi");
      return true;
    }),
});