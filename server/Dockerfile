# 1. Use a super lightweight version of Node.js
FROM node:20-alpine

# 2. Tell Docker where to put our files inside the container
WORKDIR /app

# 3. Copy ONLY your package.json files first (this makes future builds much faster)
COPY package*.json ./

# 4. Install only production dependencies (keeps the image small)
RUN npm install --only=production

# 5. Copy the rest of your backend code into the container
COPY . .

# 6. Expose the port your backend runs on (assuming it runs on 5000, change if different)
EXPOSE 5000

# 7. The command to start your server
CMD ["npm", "start"]