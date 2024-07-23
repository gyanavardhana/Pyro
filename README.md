# PYRO (Predictive Maintenance and Risk Operations)
![image](https://github.com/user-attachments/assets/b66caa4c-0065-4c66-acc4-c5d8f5298e25)


## Introduction

**Welcome** to the Product Maintenance Prediction System documentation. This system is designed to help users predict maintenance needs for their products based on various input features. It provides a comprehensive interface for data entry, prediction results, and performance monitoring through a durability leaderboard.

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech-Stack](#tech-stack)
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
![image](https://github.com/user-attachments/assets/cdfa6941-4b8f-41a9-ab52-15ae19e9ec20)



- User Management: Account creation, password management, and user-specific data handling.
- Product Data Entry: Interface to upload product data and get maintenance predictions.
- Dashboard: Displays detailed product data and predictions.
- Leaderboard: Ranks products based on prediction probabilities and sends alerts to users for underperforming products.
- Detailed reports: Get your equipment accessed by AI through detailed reports.
- Email Notifications: Alerts users via Brevo (formerly Sendinblue) when their products require attention.

## Tech stack
![image](https://github.com/user-attachments/assets/ac2c49bf-296e-4daf-b363-5e16c9fbae42)

**Frontend:**

* **React** 

**Backend:**

* **Node.js** 
* **Express.js** 
* **MongoDB** 

**APIs:**

* **Gemini API** 
* **Resend API** 

**Cloud Platform:**

* **Microsoft Azure**

## Benefits

* **Proactive Maintenance:** Schedule maintenance based on predictions, preventing equipment failures and downtime, maximizing efficiency.
* **Reduced Costs:** Optimize maintenance activities and resource allocation, minimizing unnecessary costs and maximizing resource utilization.
* **Improved Productivity:** Ensure smooth operations by addressing potential issues before they impact production, ultimately improving overall productivity.
* **Data-Driven Decisions:** Gain valuable insights from product data to make informed maintenance decisions, optimizing maintenance strategies.

 
## Data Models
![image](https://github.com/user-attachments/assets/09dc87ba-a308-4328-976d-b649194c481c)


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

## ML Model

![Screenshot 2024-07-18 185155](https://github.com/user-attachments/assets/d4904376-18e9-4291-9844-0cda23619644)

End to end azure pipeline with Restapi support
- Input features:
   - "Type": "M"
   - "Air temperature [K]": 298.1,
   - "Process temperature [K]": 308.6,
   - "Rotational speed [rpm]": 1551
   -  "Torque [Nm]": 42.8,
   - "Tool wear [min]": 0
- Output:
  - "Target": 0 or 1 
- Dataset: https://www.kaggle.com/datasets/shivamb/machine-predictive-maintenance-classification
- Algorithm: Two class decision forest

## User Interface

- ## Settings
![image](https://github.com/user-attachments/assets/4f3f9dd7-2b30-4c28-99b2-ce0447376c0c)

  - **Your Data**: Displays all product data and predictions for products created by the user.
  - **Your Preferences**: Shows data and predictions for products marked as favorites by the user.

- ## ML Upload Page
![image](https://github.com/user-attachments/assets/e8e8b2dc-0162-4202-98a8-d36e9949405f)


  - **Data Entry**: Users can input product data through a form.
  - **Prediction**: Displays the prediction result after submission.

- ## Dashboard Page
![image](https://github.com/user-attachments/assets/eed8ee0b-a187-42ed-8029-018eb9c71c2a)


   - Provides an overview of all product data and predictions.
   - Users can select any product to view detailed input features and prediction results.

- ## Leaderboard
![image](https://github.com/user-attachments/assets/d1b483f4-f1ef-4a23-8b8b-f51344c54bec)

  - Ranks products based on `probability_maintenance_needed` and `probability_no_maintenance`.
  - Sends email alerts to users if their products perform poorly.

## Installation and Setup

### Prerequisites

- Node.js and npm/yarn
- MongoDB or another database
- Gemini  and resend API
- Azure ML studio

### Installation Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/your-repository.git
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd your-repository
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the root directory with the following content:
   ```plaintext
   ''Backend''
   MONGO_URI=<Mongodb_URL>
   NODE_ENV=<prod or dev>
   JWT_SECRET=<your secret key>
   ML_URI=<your_azure_api>
   GEM_KEY=<gemini_api>
   SEND_KEY=<resend_api>
   ''Frontend''
   VITE_APP_URL=<Backend_URL>
   VITE_APP_JWT_SECRET=<same as JET_SECRET>
   VITE_APP_FLASK=<azure_model_in_flask>
   
   ```

5. **Run the Application**
   
   *Backend*
   ```bash
   npm run start
   ```
   *Frontend*
    ```bash
   npm run dev
   ```
## Usage
- Account Management: Register and log in to manage your products.
- Upload Product Data: Enter product data on the ML Upload Page and receive predictions.
- View Data and Predictions: Use the Dashboard to view and analyze your product data.
- Monitor Performance: Check the Leaderboard to see how your products rank and receive email alerts if necessary.
- Download your data: We don't save anything just get real time insights and download with ease.

## API Reference

### Authentication

- **POST /user/signup**: Register a new user.
- **POST /user/login**: Authenticate and log in a user.
- **POST /user/logout**: To deauthenticate a user.

### Product Management

- **POST /ml/createproduct**: Add new product data.
- **GET /settings/getdata**: Retrieve product data for the logged-in user.
- **GET /settings/getfavorites**: Retrieve data that matters more to user.


### Prediction

- **POST /env.ML_URI/predict**: Submit product data for prediction.
- **POST /env.ML_URI/plot**: Submit product data for visualization.

### Durability Leaderboard

- **POST /leader/addfavorites**: Add favourites from leaderboard.
- **DELETE /leader/removefacorites**: Remove products from favourites.
- **GET /leaderboard/getleaderboard**: Fetch durability leaderboard.

### Risk Assessement
- **GET /report/generatePdf**: Generate detailed report of the product health and measures.

### Sample report
- **Detailed report**: https://drive.google.com/file/d/1Eyzv8jbdsidP6sw3OSc0Jk20ly4Fx1Kl/view?usp=sharing
- **Your data**: https://docs.google.com/spreadsheets/d/1ptIRS7eFOLe6kHykoz7irR1E4FfsphjQ/edit?usp=sharing&ouid=116787808578943730397&rtpof=true&sd=true


## Contributing

Contributions are welcome! To contribute to this project:

- Fork the Repository: Create your own fork of the project.
- Create a Branch: Develop your changes in a separate branch.
- Submit a Pull Request: Open a pull request with a clear description of your changes.
- For any issues or feature requests, please open an issue on the GitHub repository.



## License

This project is has no License but use it wisely.

## Contact

For any questions or support, please contact [@viswesh](sigireddyviswesh@gmail.com) and [@gyanavardhan](gyanavardhanmamidisetti@gmail.com).

  

  

  

   



