# Deploying with Amazon EKS

This guide provides instructions for deploying the application stack on Amazon Elastic Kubernetes Service (EKS), a managed Kubernetes service that makes it easier to run Kubernetes applications in the AWS cloud.

## Overview

The project utilizes Amazon EKS to deploy a full-stack application, comprising a React frontend, Django backend, and PostgreSQL database. The deployment process is automated with GitHub Actions, enabling Continuous Integration (CI) and Continuous Deployment (CD) workflows.

## Diagram

![Diagram of the EKS Deployment](images/eks.png)

## Prerequisites

- An AWS account and AWS CLI installed and configured.
- Docker and kubectl installed locally.
- A GitHub account for setting up CI/CD with GitHub Actions.

## CI/CD Workflow Overview

The CI/CD pipeline is defined in `.github/workflows/pokeclone-cicd.yml` within the project repository and performs the following steps:

### Continuous Integration (CI)

1. **Checkout Repo**: Fetches the latest code from the specified branch.
2. **Setup Docker Buildx**: Prepares Docker for building images.
3. **Login to Docker Hub**: Authenticates to Docker Hub to enable image pushing.
4. **Build and Push Docker Images**: Builds Docker images for the frontend and backend and pushes them to Docker Hub.

### Continuous Deployment (CD)

1. **Checkout Repo**: Fetches the latest code for deployment.
2. **Configure AWS Credentials**: Sets up AWS credentials for EKS access.
3. **Update kubeconfig for EKS**: Configures `kubectl` to communicate with the Amazon EKS cluster.
4. **Deploy Resources to EKS**: Applies Kubernetes manifests in sequence to deploy namespaces, quotas, database components, backend, and frontend to EKS.

### CI/CD Environment Variables

- `DOCKER_USERNAME` and `DOCKER_PASSWORD`: Used for Docker Hub authentication.
- `AWS_REGION`, `K8S_NAMESPACE`, and `EKS_CLUSTER_NAME`: Used to specify the AWS region, Kubernetes namespace, and EKS cluster name for the deployment.

## Setting up CI/CD

1. Fork or clone the repository to your GitHub account.
2. In your repository's Settings, navigate to Secrets and add the following secrets:
   - `DOCKER_USERNAME`: Your Docker Hub username.
   - `DOCKER_PASSWORD`: Your Docker Hub password.
   - `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`: Credentials for an AWS IAM user with permissions to access EKS and manage Kubernetes resources.
3. Modify the `.github/workflows/pokeclone-cicd.yml` file as necessary to match your project's requirements.
4. Push changes to the branch specified in the workflow file to trigger the CI/CD pipeline.

## Accessing the Deployed Application

After the CI/CD pipeline successfully deploys the application, access it through the AWS Load Balancer URL provisioned for the frontend service. The Django admin interface can be accessed by appending `/admin` to the backend service's URL.

## Notes

- Ensure your AWS IAM user has sufficient permissions to create and manage EKS clusters and other AWS resources.
- Monitor the GitHub Actions workflow execution for any errors and troubleshoot as necessary.
- This setup is suitable for staging and production environments, with adjustments as per security best practices.
