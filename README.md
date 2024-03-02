# Deploying with Minikube

This branch contains configurations and instructions for deploying the application stack on Minikube, a local Kubernetes environment. It's designed to simulate a Kubernetes cluster on a local machine, making it ideal for development and testing.

## Overview

The project structure organizes Kubernetes manifests into numbered directories to dictate the order of resource creation:

- `1-namespace`: Namespace creation to isolate resources.
- `2-quota`: Resource quotas to manage compute resources within the namespace.
- `3-database`: PostgreSQL database deployment, including ConfigMaps for configuration, Secrets for sensitive data, and both Persistent Volumes (PV) and Persistent Volume Claims (PVC) for data persistence.
- `4-backend`: Django backend deployment, including ConfigMaps, Secrets, and a Service to expose the backend within the cluster. The backend will also be serving the frontend static files.

## Prerequisites

- **Minikube**: Ensure Minikube is installed and running on your local machine. Use `minikube start` to start a Minikube instance.
- **kubectl**: The Kubernetes command-line tool, `kubectl`, should be installed and configured to communicate with your Minikube cluster.

## Deployment Steps

1. **Start Minikube**:

   ```bash
   minikube start
   ```

2. **Apply Namespace and Quotas**:

   Navigate to the `k8s` directory and apply the namespace and quota configurations.

   ```bash
   kubectl apply -f 1-namespace/
   ```

   ```bash
   kubectl apply -f 2-quota/
   ```

3. **Deploy the Database**:

   Deploy the PostgreSQL database components.

   ```bash
   kubectl apply -f 3-database/
   ```

4. **Deploy the Backend**:

   Once the database is up, deploy the Django backend application.

   ```bash
   kubectl apply -f 4-backend/
   ```

## Confirm Successful Deployment

After all the manifest files have been applied, check the status of the deployment to make sure everything is running as expected:

```bash
kubectl get all -n pokeclone
```

## Managing Django Migrations and Superuser Creation

After your backend deployment is up and running, you will need to apply Django migrations and create a superuser for admin access.

### Apply Django Migrations

Run the following command to apply migrations:

```bash
kubectl exec -it $(kubectl get pod -l app=pokeclone-backend -n pokeclone -o jsonpath="{.items[0].metadata.name}") -n pokeclone -- python manage.py migrate
```

### Create Django Superuser

To create a superuser, run:

```bash
kubectl exec -it $(kubectl get pod -l app=pokeclone-backend -n pokeclone -o jsonpath="{.items[0].metadata.name}") -n pokeclone -- python manage.py createsuperuser
```

Follow the prompts to set up the superuser account.

## Accessing the Application

With the database configured and the superuser created, you're now ready to access the application.

- **Frontend Application**:
    To open the frontend application in your browser, use the `minikube service` command:

    ```bash
    minikube service backend-service --url -n pokeclone
    ```

    This command will output the URL to access the frontend service. Copy and paste it into your browser to view the application.

- **Django Admin Interface**:
    Access the Django admin interface by navigating to `/admin` on your backend service's URL. Use the superuser credentials you created earlier to log in.

## Managing the Application

- **View Logs**:
  To view the logs of a specific pod, first list all pods with `kubectl get pods -n <namespace>`, then use:

    ```bash
    kubectl logs <pod-name> -n <namespace>
    ```

- **Executing Commands Inside a Pod**: To execute commands inside a pod, such as accessing a Django or database shell, use:

    ```bash
    kubectl exec -it <pod-name> -n pokeclone -- /bin/bash
    ```

- **Checking Pod Status**: To check the status of all pods in the `pokeclone` namespace:

    ```bash
    kubectl get pods -n pokeclone
    ```

- **Describing Pod Details**: For detailed information about a specific pod, including events and configuration:

    ```bash
    kubectl describe pod <pod-name> -n pokeclone
    ```

- **Stopping Minikube**:
  To stop Minikube and preserve your environment for later, use:

    ```bash
    minikube stop
    ```

- **Deleting Minikube**:
  If you wish to completely remove all resources associated with Minikube, use:

    ```bash
    minikube delete
    ```

## Notes

- This setup is intended for development and testing purposes. For production deployments, consider using a managed Kubernetes service provided by cloud providers like AWS EKS, Google GKE, or Azure AKS.
- Remember to monitor resource usage within Minikube to avoid over consumption of your local machine's resources.
