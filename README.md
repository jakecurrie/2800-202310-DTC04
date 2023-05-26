# Artificial Gains

Artificial Gains is an AI-powered fitness and nutrition companion that combines advanced technology with a user-friendly interface to provide a comprehensive health and wellness experience. The application uses a React.js frontend, a Node.js/Express.js backend, and Python scripts for certain data processing tasks. This innovative project is the brainchild of Team DTC04, comprising BCIT students Jake Currie, Vishav Josan, Ivan Cheng, and SeungJae Baek.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contribution](#contribution)

## Introduction

Artificial Gains is committed to transforming the approach to fitness and nutrition management. The application offers personalized advice, nutrition estimates, workout plans, and motivational support tailored to each user's unique profile and objectives.

## Features

- **Fitness Companion**: Provides personalized workout plans based on the user's fitness goals, current fitness level, and available equipment. Users can also complete workouts and earn points for tracking their progress.
- **Diet Companion**: Generates meal plans and allows users to confirm meal consumption by submitting a picture. The image is processed by a food classification neural network to validate the meal, contributing to the user's point total.
- **Goal Tracker**: Helps users set, track, and achieve their fitness goals.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js, with Python scripts for certain data processing tasks
- **Database**: MongoDB
- **Deployment**: Docker

## Installation

Before you begin, ensure you have Docker installed on your machine and a stable internet connection to access the platform.

To install Artificial Gains, follow these steps:

1. Clone the repository: `git clone https://github.com/your-repo/artificial-gains.git`
2. Navigate to the project directory: `cd artificial-gains`

For the server:

3. Navigate to the server directory: `cd server`
4. Build and run the Docker image: `docker build -t server . && docker run -p 5000:5000 server`

For the client:

5. Navigate to the client directory: `cd ../client`
6. Build and run the Docker image: `docker build -t client . && docker run -p 3000:3000 client`

## Usage

To use Artificial Gains, follow these steps:

*TODO: Add usage steps based on how a user would use your product*

## Contribution

We welcome contributions from the community. If you wish to contribute, please follow these guidelines:

- Fork the repository.
- Create a new branch.
- Make your changes and commit them with appropriate messages.
- Push changes to your fork.
- Open a pull request.

Thank you for your interest in our project. We hope you enjoy using Artificial Gains!