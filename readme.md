# Backend API Documentation 🧑‍💻

## API URL 🔗

[UlikBatik API] -

## API Endpoints


| Endpoint | Method |                   Input                   |                Description                | JWT Token |
| :---------: | :------: | :------------------------------------------: | :------------------------------------------: | :---------: |
|  /users  |  GET  |                     -                     |             Get all users data             |  &#9745;  |
| /register |  POST  | username, email, password, confirmpassword |       Register account for new user       |  &#9744;  |
|  /login  |  POST  |              email, password              | Login to access the feature in application |  &#9744;  |

## How to run this API on your local machine 💻

If you want to run this API Server on your local machine, you need to do this steps:

- First, clone this repository. `git clone https://github.com/UlikBatik/cloud-computing-backend.git`
- Second, open terminal and go to this project's root directory.
- Third, type `npm ci` in your terminal and hit enter button.
- Fourth, start xampp.
- fifth, create database name `ulikbatik-dev`.
- sixth, type `npx prisma migrate dev` in your terminal and hit enter button.
- seventh, type `npm run start-dev` in your terminal and hit enter button.
- Finally, the server will run on your http://localhost:3000
