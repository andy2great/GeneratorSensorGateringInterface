# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:13.12.0-alpine as build-stage
WORKDIR /interface
COPY ./ /interface/
EXPOSE 3000
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /interface/build/ /usr/share/nginx/html