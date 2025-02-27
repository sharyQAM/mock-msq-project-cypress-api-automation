# Mock API Architecute - MUST Company
This repository is a demonstration of automated API testing using **CYPRESS** with **Javascript** for the **RESTFUL BOOKER API**.

I have used an **API Plugin** for visual details of the API.

## Getting Started

### Install Dependencies
Navigate to the project root directory and run the following command to install the necessary dependencies:

```npm install```

### Running the Test Cases
You can run the test cases using the following npm scripts:

* To run all test cases of APIs in the headed mode:

```npm run test-headed```

* To run all test cases of APIs in the headless mode:

```npm run test-headless```


### Project Structure
The project structure is organized as follows:

* cypress/e2e: Contains positive and negative test cases of create booking **API** for "RESTFUL BOOKER API".
* fixtues : Contains **multiple request bodies** used in the test cases, following a **data-driven** approach.
* cypress.config.js: Contains **baseURL** of the APIs.
* package.json: Containing the **plugins** version details. Also defined **headed** and **headless** test run scripts.

Feel free to explore the project structure and customize it according to your requirements.
