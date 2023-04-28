# template-next-supabase

Starterkit for OpenAI chat client based on your own content. Main ingredients:

- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com) + [pgvector](https://supabase.com/docs/guides/database/extensions/pgvector)
- [@7-docs/edge](https://www.npmjs.com/package/@7-docs/edge)
- TypeScript
- Tailwind

## Install

- [Use this template](https://github.com/7-docs/template-next-supabase/generate)
- Clone your new repo
- `npm install`
- [Prepare vector database](#prepare)
- [Ingest content](#ingest)
- `cp .env.example .env.local` and paste your tokens: `OPENAI_API_KEY`, `SUPABASE_URL`, `SUPABASE_API_KEY`

The following commands are using `my-namespace` as set in [config.ts](./config.ts) and ingest content from the
`reactjs/react.dev` repository. By all means, you're encouraged to change them to something more original.

## Prepare db

Create a Supabase account if you don't have one already.

The following command does not actually do anything. Instead, it gives you an all-batteries-included SQL query to run in
your [Supabase project area](https://app.supabase.com/projects)'s SQL Editor:

```shell
npx 7d supabase-create-table --namespace my-namespace
```

## Ingest

```shell
npx 7d ingest \
  --source github \
  --repo reactjs/react.dev \
  --files 'src/content/reference/react/*.md' \
  --files 'src/content/reference/react-dom/*.md' \
  --files 'src/content/learn/*.md' \
  --namespace my-namespace
```

## Run

```shell
npm run dev
```

## Deploy

This application can be deployed somewhere with support for Next.js + edge functions. Examples:

- [Vercel](https://vercel.com)
- [Fly.io](https://fly.io)
