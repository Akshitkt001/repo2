# frontend/Dockerfile

FROM node:14

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .

RUN npm install

# Copy all frontend code into the container
COPY . .

# Expose the port that React will run on
EXPOSE 3000

# Command to start the React app
CMD ["npm", "start"]
