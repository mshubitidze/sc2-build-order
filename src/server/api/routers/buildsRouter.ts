import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

const buildStepsSchema = z.array(
  z.object({
    supply: z.number(),
    unit: z.string(),
    note: z.string().optional(),
  })
);

export const buildsRouter = createTRPCRouter({
  createBuild: publicProcedure
    .input(
      z.object({
        matchUp: z.string(),
        buildSteps: buildStepsSchema,
        style: z.string(),
        author: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const build = await ctx.prisma.buildOrder.create({
        data: {
          matchUp: input.matchUp,
          buildSteps: {
            create: input.buildSteps,
          },
          style: input.style,
          author: input.author,
          title: input.title,
          description: input.description,
        },
      });

      return build;
    }),
  getBuildsByMatchUp: publicProcedure
    .input(z.object({ matchUp: z.string() }))
    .query(async ({ ctx, input }) => {
      const build = await ctx.prisma.buildOrder.findMany({
        where: {
          matchUp: input.matchUp,
        },
      });

      return build;
    }),
  getBuildById: publicProcedure
    .input(z.object({ buildId: z.string() }))
    .query(async ({ ctx, input }) => {
      const build = await ctx.prisma.buildOrder.findUnique({
        where: {
          id: input.buildId,
        },
        include: {
          buildSteps: true,
        },
      });

      return build;
    }),
  incrementBuildOrderView: publicProcedure
    .input(z.object({ buildId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const build = await ctx.prisma.buildOrder.update({
        where: { id: input.buildId },
        data: {
          views: {
            increment: 1,
          },
        },
      });

      return build;
    }),
});
