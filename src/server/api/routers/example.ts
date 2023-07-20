import { z } from "zod";
import Docker from 'dockerode'
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const dockerode = new Docker()

// dockerode.getEvents((err, stream) => {
//   if (err) {
//     console.error('Error listening to Docker events:', err);
//     return;
//   }

//   stream!.on('data', (chunk) => {
//     const event = JSON.parse(chunk.toString());
//     if (event.Type === 'container' && event.Action === 'die') {
//       console.info(event);
//     }
//   });
// })

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  runCode: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const container = await dockerode.createContainer({
        Cmd: ['cat /app/output.txt'],
        // Image: 'joe_runners_javascript:latest',
        Image: 'joe_runners_python:latest',
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        Env: [
          `RAW_CODE=${input.text}`,
          // `MAIN_FUNCTION_NAME=main`,
        ]
      })

      await container.start()
      await container.wait()

      const logs = await container.logs({ stdout: true })

      return logs.toString().trim();
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
