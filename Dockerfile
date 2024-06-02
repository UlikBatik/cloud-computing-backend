FROM node:20

# ENV Variables
ENV DB_HOST=34.101.38.137
ENV DB_USER=root
ENV DB_PASS=123456789
ENV DB_NAME=ulikbatik-dev
ENV DB_URL=mysql://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}
ENV BUCKET_URL=thisisbucketurl
ENV BUCKET_NAME=ulik-batik-storage
ENV PROJECT_ID=ulik-batik
ENV SECRET_KEY=ulikbatiksecretisverysecret
ENV SALT=ulikbatiksaltisverysecret
ENV MODEL_URL=https://storage.googleapis.com/ulik-batik-storage/model/model.json

# Create and change to the app directory.
WORKDIR /app

COPY package*.json ./

RUN npm ci

# Copy local code to the container image.
COPY . ./

# Generate Prisma client
RUN npx prisma generate

# Run the web service on container startup.
CMD [ "npm", "start" ]
