# Testing

Unit tests located in the UnitTests folder in the client/src folder 

Behavioral tests located in the Behave folder in the tests folder in the root directory

## To run unit tests
path: SystembBreakers/client/

npm install --save-dev jest @testing-library/react @testing-library/jest-dom identity-obj-proxy

npm test

Press a to run all tests if tests don't run originally

## To run behavioral tests

### First start the application

path: SystemBreakers/client

npm run start-client

path: SystemBreakers/server

npm start

### Then start testing

path: SystemBreakers/tests/Behave

npm install cypress --save-dev

npx cypress open

### In Cypress

E2E Config - Chrome - Select App.spec
