# syntax=docker/dockerfile:1

# Use an official Python runtime as a parent image
FROM python:3-alpine

WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /app/

# Environment variables (for documentation, set actual values at runtime)
ENV DJANGO_KEY="pikachu"

# Expose port 8000 to access Django app
EXPOSE 8000

# Start the Django app using the built-in server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Build and push Docker image:
# docker build -t slamoureux/pokeclone-back-end:compose .
# docker push slamoureux/pokeclone-back-end:compose

# Run the backend container:
# docker run -itd -p 8000:8000 --rm --name pokeclone-be slamoureux/pokeclone-back-end:compose
