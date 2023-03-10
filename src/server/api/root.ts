import { createTRPCRouter } from "./trpc";
import { buildsRouter } from "./routers/buildsRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  builds: buildsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
