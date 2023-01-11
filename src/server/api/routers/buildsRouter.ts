import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const buildsRouter = createTRPCRouter({
  createBuild: publicProcedure
    .input(
      z.object({
        matchUp: z.string(),
        build: z.string(),
        style: z.string(),
        author: z.string(),
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const build = await ctx.prisma.buildOrder.create({
        data: {
          matchUp: input.matchUp,
          build: input.build,
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
      });
      return build;
    }),
});
