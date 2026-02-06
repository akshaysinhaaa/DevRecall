import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { ensureUserInDb } from "@/server/sync-user";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        githubUrl: z.string().min(1),
        githubToken: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const dbUserId = await ensureUserInDb(ctx.user.userId!);
      const project = await ctx.db.project.create({
        data: {
          githubUrl: input.githubUrl,
          name: input.name,
          userToProjects: {
            create: {
              userId: dbUserId,
            },
          },
        },
      });
      return project;
    }),
    getProjects: protectedProcedure.query(async ({ ctx }) => {
      const dbUserId = await ensureUserInDb(ctx.user.userId!);
      return await ctx.db.project.findMany({
        where: {
          userToProjects: {
            some: {
              userId: dbUserId
            }
          },
          deletedAt: null
        }
      })
    })
});

