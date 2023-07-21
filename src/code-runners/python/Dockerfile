# Use an appropriate Python base image
FROM python:alpine

RUN apk add --no-cache bash

# Copy the entrypoint script into the container
COPY entrypoint.sh /app/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Create a group and user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN chown -R appuser:appgroup /app

USER appuser

# Set the entrypoint for the container
ENTRYPOINT ["/app/entrypoint.sh"]
