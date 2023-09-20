# 🔵 GrocRe: An AI Powered Meal Planner 🔵
<img src="./frontEnd/public/logo.png" width="400"/>

## Description
GrocRe is a web application designed to help you personalize your meal planning experience.  GrocRe leverages AI to provide you with recipes, nutritional facts, and a shopping list for meal preparation. Share your plans and discover new recipes through our built-in social network.

## Table of Contents

- [Installation](#installation)

## Installation
 
Clone to local machine
```bash
git clone git@github.com:Betelgeuse-Blasters/GrocRE.git
```
Install node dependencies for the client
```bash
cd frontEnd
npm install
```
Install node dependencies for the server
```bash
cd server
npm install
```
Clone the env file in the server
```yaml
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

API_KEY= OPENAI KEY HERE
```
Generate a Prisma instance using:
```bash
npm run generate
```
<!-- ## Licensing IDK if we want to add this (take out in code review)

ISC License


Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE. -->

## Roles

[Kayla Loizzo](https://github.com/kloizzo) - Project Manager | AI Page  
[Mike Gamba](https://github.com/helperbee) - Architecture | Meal Editing  
[Kevin Glidden](https://github.com/GliddenSolutions) - UI/UX | Meal Editing  
[Liam McEneaney](https://github.com/liam-mceneaney) - AI Page  
[Kiel Fuller](https://github.com/kpfuller28) - Social Page  
[Jung Hoan Kim ](https://github.com/kjunghoan)- Social Page
## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)
![antD](https://img.shields.io/badge/Ant%20Design-1890FF?style=for-the-badge&logo=antdesign&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

Anime.js  
OpenAI  


<details>
  <summary><b>Development</b></summary>


Our team worked in a one-week sprint to deliver a minimum viable product (MVP) for our client. We focused on agile methodology, daily standups, and continuous feedback loops for smooth collaboration.

### Technical Challenges and Research
Our main challenge was integrating various technologies in our stack to create a coherent, user-friendly application. One particular challenge was making efficient OpenAI API calls to retrieve recipes and nutritional data. Rendering this information effectively on the front-end required careful planning. Tying together the backend and organizing the data in a logical manner was crucial for seamless collaboration across different components of the project.

### Unexpected Challenges
Authentication posed a recurring challenge throughout development. Initially, we planned to use Auth0 for handling session and user logins. However, the steep learning curve and time constraints forced us to pivot to a custom authentication process. Another challenge was aligning coding conventions among team members, especially when building upon each other's work.

<!-- # Video Demo / Screenshot Walkthrough
[Link to the demo or screenshot walkthrough] -->

### How Does the App Work?
When a user interacts with GrocRe, data is processed through our Node.js/Express server and stored in a PostgreSQL database using our ORM of choice, Prisma. This information is then relayed back to the user interface.

<!-- [Include Diagram if possible] -->

### Research Required

We conducted research on interacting with OpenAI, optimizing tokens, and prompting. We also learned a great deal about Agile project management, which played a crucial role in our workflow.

### Workflow and Key Lessons

We followed an Agile workflow, maintained a Trello board for ticketing, conducted daily standups, and periodically reviewed our code. This process taught us the importance of regular communication, efficient task delegation, and timely feedback. Details on our Git workflow are provided in a section below.

<!-- [Link to your Trello board] -->
</details>
