# Pyro (Predictive Maintenance and Risk Operations)

## Introduction

Welcome to the Product Maintenance Prediction System documentation. This system is designed to help users predict maintenance needs for their products based on various input features. It provides a comprehensive interface for data entry, prediction results, and performance monitoring through a durability leaderboard.

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Data Models](#data-models)
  - [User](#user)
  - [Product](#product)
  - [ProductOutput](#productoutput)
- [ML model](#ml-model)
- [User Interface](#user-interface)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

  ## Overview

  The Product Maintenance Prediction System allows users to:

- Manage Accounts: Create and manage user accounts.
- Upload Product Data: Enter and submit product data for maintenance prediction.
- View Predictions: Access predictions and detailed data for each product.
- Analyze your data: Analyze your own data for neccessary action
- Monitor Performance: View a leaderboard of products based on their maintenance prediction probabilities.
- Receive Alerts: Get notified via email if products fall below specific performance thresholds.

  ## Features

- User Management: Account creation, password management, and user-specific data handling.
- Product Data Entry: Interface to upload product data and get maintenance predictions.
- Dashboard: Displays detailed product data and predictions.
- Leaderboard: Ranks products based on prediction probabilities and sends alerts to users for underperforming products.
- Detailed reports: Get your equipment accessed by AI through detailed reports.
- Email Notifications: Alerts users via Brevo (formerly Sendinblue) when their products require attention.


 
## Data Models

### User

- `username`: String - The username of the user.
- `email`: String - The email address of the user.
- `password`: String - The hashed password of the user.
- `salt`: String - The salt used for password hashing.
- `products`: [ProductId] - Array of ProductIds created by the user.
- `favourites`: [ProductId] - Array of ProductIds marked as favorites by the user.

### Product

- `name`: String - The name of the product.
- `Airtemperature`: Number - The air temperature of the product.
- `Processtemperature`: Number - The process temperature of the product.
- `Rotationalspeed`: Number - The rotational speed of the product.
- `Torque`: Number - The torque of the product.
- `Toolwear`: Number - The tool wear of the product.
- `userid`: UserId - The UserId of the user who created this product.
- `count`: Number - Reference to calculate average of factors throughout

### ProductOutput

- `prediction`: String - Prediction of maintenance needs.
- `probability_maintenance_needed`: Number - Probability that maintenance is needed.
- `probability_no_maintenance`: Number - Probability that no maintenance is needed.
- `productid`: ProductId - The ProductId of the product.

## User Interface

### Settings

- **Your Data**: Displays all product data and predictions for products created by the user.
- **Your Preferences**: Shows data and predictions for products marked as favorites by the user.

### ML Upload Page

- **Data Entry**: Users can input product data through a form.
- **Prediction**: Displays the prediction result after submission.

### Dashboard Page

- Provides an overview of all product data and predictions.
- Users can select any product to view detailed input features and prediction results.

### Leaderboard

- Ranks products based on `probability_maintenance_needed` and `probability_no_maintenance`.
- Sends email alerts to users if their products perform poorly.

## Installation and Setup

### Prerequisites

- Node.js and npm/yarn
- MongoDB or another database
- Brevo (formerly Sendinblue) account

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/your-repository.git





