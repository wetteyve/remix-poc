import { z } from 'zod';

const serverModes = ['production', 'development', 'test', 'staging'] as const;
export type ServerMode = (typeof serverModes)[number];

const schema = z.object({
  NODE_ENV: z.enum(serverModes),
  ALLOW_INDEXING: z.enum(['true', 'false']).optional(),
  IS_PROD: z.enum(['true', 'false']).optional(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof schema> {}
  }
}

export function init() {
  const parsed = schema.safeParse(process.env);

  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
    );

    throw new Error('Invalid environment variables');
  }
}

/**
 * This is used in both `entry.server.ts` and `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export function getEnv() {
  return {
    MODE: process.env.NODE_ENV as ServerMode,
    ALLOW_INDEXING: process.env.ALLOW_INDEXING,
  };
}

type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
