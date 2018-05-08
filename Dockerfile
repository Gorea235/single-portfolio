FROM node:10.0.0-slim as base
WORKDIR /app
EXPOSE 80
ENV PORT="80"

FROM node:10.0.0 AS build
WORKDIR /src
COPY . .
RUN make

FROM base AS final
COPY --from=build /src/build/out .
ENTRYPOINT ["node", "app.js"]
