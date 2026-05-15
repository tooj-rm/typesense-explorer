FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# ---------------- Dependencies ----------------
FROM base AS deps

COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./

COPY apps/*/package.json apps/*/package.json
COPY packages/*/package.json packages/*/package.json

RUN pnpm install

# ---------------- Build ----------------
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm --filter nextjs build

# ---------------- Runner ----------------
FROM node:24-alpine AS runner

ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY --from=builder /app/apps/nextjs/.next/standalone ./
COPY --from=builder /app/apps/nextjs/.next/static ./apps/nextjs/.next/static
COPY --from=builder /app/apps/nextjs/public ./apps/nextjs/public

EXPOSE 3000

CMD ["node", "apps/nextjs/server.js"]