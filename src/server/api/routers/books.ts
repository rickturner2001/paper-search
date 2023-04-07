import { z } from "zod";
import { getBooksByName, getBooksByUrl } from "~/functions";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const booksRouter = createTRPCRouter({
  getBook: publicProcedure
    .input(z.object({ bookName: z.string().nullable() }))
    .query(async ({ input }) => {
      return await getBooksByName(input.bookName);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    }),

  getBooksByUrl: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input }) => {
      return await getBooksByUrl(input.url);
    }),
});
