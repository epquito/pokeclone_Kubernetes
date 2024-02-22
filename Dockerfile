# syntax=docker/dockerfile:1

# Step 1: Build the React application
FROM node:alpine as build-stage
WORKDIR /app
COPY front_end/package*.json ./
RUN npm install
COPY front_end/ .
RUN npm run build

# Step 2: Prepare the Django environment
FROM python:3-alpine
WORKDIR /app

# Install dependencies
COPY back_end/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project
COPY back_end/ /app/

# Copy the built React app to the Django static files directory
COPY --from=build-stage /app/dist /app/static

# Environment variables (for documentation, set actual values at runtime)
ENV DJANGO_KEY=pikachu \
    DB_NAME=pokeclone_db \
    DB_USER=postgres \
    DB_PASSWORD=postgres \
    DB_HOST=database \
    DB_PORT=5432

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port 8000 to access Django app
EXPOSE 8000

# Start the Django app using the built-in server (use gunicorn or uwsgi for production)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
