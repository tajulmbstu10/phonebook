# Phonebook (MERN application)
This is simple phonebook and factorial calculator application using node, mongo, react, express. 

# Technology 
1. Node js (express)
2. React, react-redux
3. mongo 

# Project folder details

1. Here backend folder is the node express api and frontend is the react application. This is a fullstack application. config.js inside the backend folder contain the variables like port, dburl, secretekey etc. 

## Setup instruction 
1. At First install node js , git and mongodb.
2. clone the project. 

# Database setup

Install mongodb. Rename .env.example to .env and add your database url in MONGODB_URL constant. 

Note: If you run mongo db in local environment then dont forget to run `mongod` in particular terminl. 

# Development mode

In development mode, Open terminal in project directory and run 
    `npm install` and `npm run install-client` and `npm run dev`

Frontend run in http://localhost:3000/ and backend in http://localhost:5000/

Note: Dont forget to install `npm install --dev` if dev dependency is not installed. use gitbash terminal if face any problem for  build. 

# Production 

At first Build the project. Open terminal in project directory and run
    `npm install` and `npm run build` and `npm run build-client`. Now run the project `npm start`. Done. 

Hurray app run in http://localhost:5000/.

If you use windows os then try to use gitbash terminal when build or 
try to delete previous dist folder manually (if exist) and remove `rm -rf dist &&` from build script in package.json file. 

Note: If you run in production mode, please ensure that you have created .env file and set the variables or rename the .env.example to .env and set the variables. 




