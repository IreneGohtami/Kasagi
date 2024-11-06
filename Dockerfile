FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Copy all source files
COPY main.js ./
COPY read.js ./
COPY write.js ./
COPY files ./files

# Create a script to run the app
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

# Convert line endings to Linux format (LF)
RUN sed -i 's/\r$//' docker-entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["./docker-entrypoint.sh"]