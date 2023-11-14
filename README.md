# Campaign-Candidate Coding

A simple web app.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation and Usage](#installation-and-usage)

## Features

- API Interaction
- Campaign Creation
- Candidate Creation
- Shortlisting of Candidates
- User-friendly Navigations

## Getting Started

To get a local copy of this project up and running, follow these simple steps.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) - Make sure to install the LTS version.
- [Git](https://git-scm.com/) - Version control system.
- Any Coding Editor (Visual Studio Code)

### Installation and Usage

1. Clone the repository:
    git clone https://github.com/chimetoeat/campaign-candidate-code.git

2. Navigate to project directory:
    cd 'project-name'

3. Install dependencies:
    npm install

4. Start server:
    nodemon index.js

5. Open your web browser and go to http://localhost:3000 to see the project in action.

6. To create a new Campaign, go to http://localhost:3000/campaign to see the form and submit one.

7. Change the Campaign ID of the Talkpush API Requests in the lines with comments // FOR TESTING if you created a new campaign. You can check your Campaign Title here: https://tech-eval.talkpush.com/api/talkpush_services/campaigns?api_key=77a9113bda7ae5b92a6ef892135d4e04

8. To create a new Candidate, simply click the 'Create New Candidate' or you can go to http://localhost:3000/campaign to see the form and submit one.

9. After creating a new candidate, please do wait for a few moments for the server to reflect the newly created candidates. You can use Postman to check.

10. To shortlist a candidate, simply click the Shorlist button beside the names of the candidates. All shortlisted candidates' buttons will be disabled once they're shortlisted.

11. For testing, please use this command in your project directory -> NODE_OPTIONS=--experimental-vm-modules npx jest