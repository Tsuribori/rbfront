FROM node:8.16-alpine

RUN mkdir -p /app/frontend

WORKDIR /app/frontend

COPY package.json yarn.lock ./

RUN yarn install  --network-timeout 1000000

COPY . /app/frontend

# Create compressed tarball of source to be served.
RUN tar --exclude-from=.gitignore -czvf public/rbfront.tar.gz .

CMD ["yarn", "build"]
