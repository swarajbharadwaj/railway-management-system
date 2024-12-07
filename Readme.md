# Railway Management System

This project implements a Railway Management System with seat booking functionality. It allows users to book seats on trains, check availability, and handle train bookings using a database-backed API. The system utilizes MySQL for data storage and Express.js for building the REST API.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
  - [User Registeration](#user-registeration)
  - [User Login](#user-login)
  - [Get Train Availability](#get-train-availability)
  - [Get Seat Availability](#get-seat-availability)
  - [Book Seat](#book-seat)
  - [Get Booking Details](#get-booking-details)
  - [Add Train](#add-train)
  - [Update Seat Availability](#update-seat-availability)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
This project implements a Railway Management System where users can:
- View available trains and their seat availability.
- Book seats on trains if available.
- Handle seat reservations in a concurrent environment with transaction support to prevent race conditions.

## Features
- **Booking functionality**: Allows users to book seats on trains if available.
- **Transaction management**: Ensures atomic operations with database transactions, ensuring consistency even in concurrent environments.
- **Seat availability check**: Locks the row when checking seat availability to prevent race conditions.
- **REST API**: Exposes endpoints for interacting with the Railway Management System.
- **Modular architecture**: Clean separation between the database layer (model) and the business logic (controller).

## Technologies Used
- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework for building REST APIs.
- **MySQL**: Relational database for storing train and booking information.
- **JWT (JSON Web Token)**: For authenticating users during seat booking (optional feature, based on your implementation).
- **Sequelize (Optional)**: For interacting with MySQL using an ORM (not included, but can be added).

## Setup and Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/swarajbharadwaj/railway-management-system.git
   cd railway-management-system
2. Install dependencies:
    ```bash
    npm init
    npm i express jsonwebtoken bcrypt mysql2 dotenv
3. Set up environment variables:
   Create a `.env` file in the root of your project and add the following:

    ```env
      DB_USER=root
      DB_HOST=localhost
      DB_PASSWORD=your-password
      DB_NAME=railway-system
      JWT_SECRET_KEY=your-secret-key
      API_KEY=your-api-key
      PORT=PORT_NO

## Database Setup
1. Create the necessary tables in MySQL:
   Run the following SQL queries to create the required tables:
   ```sql
   CREATE DATABASE railway_system;

   USE railway_system;
    CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
    );
    CREATE TABLE trains (
      id INT AUTO_INCREMENT PRIMARY KEY,
      source VARCHAR(255) NOT NULL,
      destination VARCHAR(255) NOT NULL,
      total_seats INT NOT NULL,
      available_seats INT NOT NULL
    );   
    CREATE TABLE bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      train_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (train_id) REFERENCES trains(id)
    );

## API Endpoints
  ### User Registeration
  - **POST  /user/user-registration**
    
    Registers a new user.
    
    **Request Body:**
    
    ```json
      {
        "username": "john_doe",
        "email": "john@example.com",
        "password": "password123",
      }

  ### User Login
  - **POST /user/user-login**
    
    Authenticates a user and returns a JWT token.
    
    **Request Body:**
    
    ```json
      {
        "email": "john.doe@example.com",
        "password": "password123"
      }
  Will get an authoization token in response

  ### Get Train Availability
  - **GET /user/get-train-availability?source=Delhi&destination=Mumbai**
    
    Retrieves all trains available between the specified source and destination.
    
  ### Get Seat Availability
  - **GET /user/get-seat-availability?train_id=1**
    
    Retrieves the number of available seats on a specific train.
    
  ### Book Seat
  - **POST /user/book-seat**
    
    Books a seat on a train for the authenticated user.
    ### Headers:
    - **Authorization**: `Bearer {JWT_TOKEN}` (Required)

    **Request Body:**
    
    ```json
    {
      "userId": 1,
      "trainId": 1
    }
  ### Get Booking Details
  - **GET /user/get-booking-details?userId=1**
    ### Headers:
    - **Authorization**: `Bearer {JWT_TOKEN}` (Required)

    Retrieves all booking details for a specific user.
  ### Add Train
  - **POST /admin/add-train**
    
    Adds a new train to the system.
    ### Headers:
    - **Authorization**: `your-api-key` (Required)
    
    **Request Body:**
    
    ```json
      {
        "train_name": "SuperFast Express",
        "source": "Delhi",
        "destination": "Mumbai",
        "total_seats":100,
        "available_seats": 100
      }
  ### Update Seat Availability
  - **POST /admin/update-seat-availability**
    
    Updates the number of available seats for a specific train.
    ### Headers:
    - **Authorization**: `your-api-key` (Required)

    **Request Body:**
    
    ```json
      {
        "train_name": "SuperFast Express",
        "available_seats": 200
      }
## Contributing
  1. Fork the repository.
  2. Create a new branch:
     ```bash
     git checkout -b feature-branch
  3. Commit your changes:
     ```bash
     git commit -am 'Add new feature'
   4. Push to the branch:
      ```bash
      git push origin feature-branch
   5. git push origin feature-branch
      
 ## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
  
  