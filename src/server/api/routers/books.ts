import { z } from "zod";
import { getBooksByName, getBooksByUrl, getPdfsByQuery } from "~/functions";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const booksRouter = createTRPCRouter({
  getBook: publicProcedure
    .input(z.object({ bookName: z.string().nullable() }))
    .query(async ({ input }) => {
      return await getBooksByName(input.bookName);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    }),

  getPDFsBySearchQuery: publicProcedure
    .input(z.object({ query: z.string().nullable() }))
    .query(async ({ input }) => {
      return await getPdfsByQuery(input.query);
    }),

  getBooksByUrl: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input }) => {
      return await getBooksByUrl(input.url);
    }),

  getPdfQueryNextPage: publicProcedure
    .input(z.object({ query: z.string(), page: z.number() }))
    .mutation(async ({ input }) => {
      return await getPdfsByQuery(input.query, true, input.page);
    }),
});
