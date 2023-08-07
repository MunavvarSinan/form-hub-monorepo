FROM node:lts AS base

# install pnpm and turbo globally
RUN npm install -g pnpm turbo

FROM base AS builder
# Set working directory
WORKDIR /app
COPY . . 
RUN pnpm --package=turbo dlx turbo prune --scope=api --docker
# here --scope=api is the name of the workspace. that is api is the name of the workspace in the package.json

# remove all empty node_modules folder structure
RUN rm -rf /app/out/full/*/*/node_modules

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install  --frozen-lockfile

# Build the project and its dependencies
COPY turbo.json turbo.json
COPY --from=builder /app/out/full/ .
RUN pnpx turbo run build --filter=api...


FROM base AS runner
WORKDIR /app

# Don't run production as root
# RUN addgroup --system --gid 1001 expressjs
# RUN adduser --system --uid 1001 expressjs
# USER expressjs
COPY --from=installer /app .
WORKDIR /app/apps/api
RUN pnpm dlx prisma generate

EXPOSE 8080
CMD ["pnpm", "start"]
