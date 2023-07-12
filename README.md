# Startup MatchMaker

## Description

This is a full-stack web application built with Node.js, Express.js, GraphQL, React.js, Apollo-client, and MongoDB. This web-based platform facilitates connections between startups and investors. Users can sign up as either startups or investors, create profiles, and interact with each other. Startups can showcase their company information and funding needs, while investors can explore startups and express interest by liking their profiles. The application provides features such as user authentication, profile management, notification system, messaging functionality between users, and investment transactions via Stripe.

The frontend code (client-side) is built using React, with components, hooks, and libraries specific to React for rendering the user interface and interacting with the server through API calls. The server-side code (backend) is written in Node.js with Express.js for handling routing, middleware, and HTTP requests. We've integrated GraphQL for efficient data querying and manipulation.

## User Story

As a startup or investor, I want to create a profile detailing my business and investment needs, and interact with others through a secure, interactive platform.

## Acceptance Criteria

As a startup, I can: <br>

Create an account and enter necessary details about my business and funding needs. <br>
Manage my profile and track the interest of investors in my startup. <br>
Access a secure messaging system to interact with potential investors. <br>
Receive notifications when investors express interest in my startup. <br>
View the profiles of investors who have expressed interest in my startup. <br>
Send messages to investors who have expressed interest in my startup. <br>

As an investors, I can: <br>

View my profile and send me messages. <br>
Create an account and enter necessary details about their investment interests and criteria. <br>
Browse through startups and express interest in those that they're interested in. <br>
View the profiles of startups that they're interested in. <br>
Send messages to startups that they're interested in. <br>
Invest in startups that they're interested in via Stripe. <br>

## Deployed URL:


## Github Repository:


## Overview of Code structure and its components:

The application consists of several components:

Server: The server directory contains the backend code for the application, which includes controllers, models, routes, middleware, and GraphQL schema.

Controllers: This directory houses the logic and functionality for different parts of the application, including User, Investment, Message, and Auth Controllers. It also includes API triggers such as 'addInvestment', 'checkAmount', 'addLike', and 'getNotifications'.

Models: The models directory contains the database schema definitions using Mongoose, which include models for User, Startup, Investor, Notification, Message, and Thread.

Routes: The routes directory contains the route definitions for different API endpoints. It includes routes for authentication, user actions, and the like API.

Middleware: The middleware directory contains middleware functions that perform actions before or after handling a request, including user authentication and verification.

GraphQL Schema: The server schema defined in server/schema/index.js validates and stores the required fields in the server/models folder, offering a dynamic API tailored to our clients' needs.

Frontend: The frontend code (client-side) is built using React and styled components from Chakra UI, with components, hooks, and libraries specific to React for rendering the user interface and interacting with the server through API calls. It provides a responsive user interface from the slide components in the home page to the investor card and startup card components.

Socket.IO: Facilitates all real-time interactions, including the messaging service.

File Upload: The application includes a file upload feature powered by Multer where users can add their photos.

Stripe: Integrated for facilitating investment transactions.

How to run the application
To run the application locally, follow these steps:

Navigate to the server folder and run the following commands:

sql
Copy code
npm install
npm start
Then, navigate to the client folder and run the following commands:

sql
Copy code
npm install
npm start
The application should now be running on port 3000.

Special Thanks
Shout out to the awesome Instructors and TAs who worked with me through numerous challenges. These individuals include: Diego, Enrique Gomes, Joem Casusi, and Erik Hoverstein.

Authors
Lavell Juan <br>
Kyle Chau <br>
Fady Khalil <br>

Credits
N/A

License
Please refer to license in repo.

