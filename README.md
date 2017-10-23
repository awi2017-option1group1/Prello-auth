# Prello-auth
Prello's authentification application.

[![CircleCI](https://circleci.com/gh/awi2017-option1group1/Prello-auth/tree/master.svg?style=svg)](https://circleci.com/gh/awi2017-option1group1/Prello-auth/tree/master)

- - - - - - - - -

## Installation

Before installing Prello-auth, you need to have Prello-back installed.

- Clone the github repository. 

    `git clone https://github.com/awi2017-option1group1/Prello-auth`
- Install the dependencies for development mode 

	`npm install`
- Update the Prello db schema with the script `schema.sql`.   

## Execution

- Complete and update the `.env` file then source it

    `source .env`
- To run the application in development mode 

    `npm run start:dev`
- To run the application in production mode

	`npm run build && npm start`
- To run the tests

	`npm test`

- - - - - - - - -

## Dependencies

- Prello back end application is written in `Typescript`.  
- It is built with `Express`.
- We use `TypeORM` as ORM for the application.  
- To test the application we use `Jest`.

- - - - - - - - -

## Contributing

Please follow the Google Angular guidelines: 
[Guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)

## Useful links to look at before contributing
- [TypeORM documentation](http://typeorm.io/#/)

