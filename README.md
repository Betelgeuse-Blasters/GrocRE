🔵 GrocRe: An AI Powered Meal Planner 🔵
Cool Graphic

# Contributors
Kayla Loizzo  
Kevin Glidden  
Kiel Fuller  
Liam McEneaney  
Mike Gamba  
Simon Kim  

In a one-week sprint, our team delivered an MVP for our client, Hugh Jappetite. This intense period of collaboration, learning, and problem-solving resulted in a product that we're proud to showcase.

# What Does the App Do?

GrocRE provides a web based platform for users to prompt for a any sort of dish they want.  Our custom API call returns a recipe, nutrition facts, and all of the ingredients needed for that dish.  Then they can save their recipes in Meal Plans, share them to a social feed, and interact with those posts.

# Tech Stack
React.js  
Node.js  
PostgreSQL  
Prisma  
VITE  
Express.js  
Anime.js  
tailwindcss  
AntD  
OpenAI  
Axios  

# Technical Challenges and Research
Our main challenge was integrating various technologies in our stack to deliver a coherent, user-friendly application.  One particular challenge was making efficient OpenAI API calls to retrieve recipe and nutritional data, and rendering this information effectively on the front-end.  Tieing together the backend and relating the data in a logical fashion took a lot of planning to allow everyone to work on their individual components.

# Unexpected Challenges
Authentication was a recurring challenge through development.  Handling session and user logins were originally going to be handled by Auth0.  It took too much time to try and learn how to properly interface and save Auth0 user information to our backend so the team pivoted to using a home-baked user authentication process.  Another challenge was understanding each other's coding conventions when trying to build upon each other's work.

# Video Demo / Screenshot Walkthrough
[Link to the demo or screenshot walkthrough]

# How Does the App Work?
When a user interacts with GrocRe, data is processed through our Node.js/Express server and stored in a PostgreSQL database through our ORM of choice, Prisma. This information is then relayed back to the user interface.

[Include Diagram if possible]

# Research Required
We had to conduct research in how to interact with OpenAI, optimizing tokens, and prompting. We also learned a great deal about Agile project management, which played a crucial role in our workflow.

# Workflow and Key Lessons

We followed an Agile workflow, maintaining a Trello board for ticketing, conducting daily standups, and periodically reviewing our code. The process taught us the importance of regular communication, efficient task delegation, and timely feedback.  In a below section is our git workflow.

[Link to your Trello board]

# Future Work

To further ensure consistent meal data, we will look into fine-tuning a model with our ideal scenarios for recipes we already have generated. Styling updates, social integrations with outside social media sites.

# Roles

Kayla Loizzo - Project Manager / AI Page  
Mike Gamba - Architecture / Meal Editing  
Kevin Glidden - UI/UX / Meal Editing  
Liam McEneaney - AI Page  
Kiel Fuller - Social Page  
Simon Kim - Social Page  


## Setup

npm install  in the frontend  
npm install  in the server  

Clone to local machine
```sh
git clone git@github.com:Betelgeuse-Blasters/GrocRE.git
```
## Git Workflow
https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
Checkout and sync main
```
git checkout main
git fetch origin
git reset --hard origin/main
```
Create a new branch from main for the feature
```
git checkout -b new-feature
```
Once work is complete stage/commit on the feature branch
``` sh
git status
git add <files>
git commit
```
Push the changes to the repo
```
git push -u origin new-feature
```
. Create a pull request to merge feature branch to main
From Git create a pull request to merge the branches
### Example Workflow
* git clone git@github.com:Betelgeuse-Blasters/GrocRE.git
* git checkout -b newcomponent
* newcomponent.js << console.log('hello world')
* git add newcomponent.js
* git commit -m "new component created"
* git push -u origin newcomponent
* -- go to Git --
* create new pull request master << newcomponent
* resolve merge conflicts
### Commit Style Guide
https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/
Format:
*
* <type>[optional scope]: <description>
*
* [optional body]
*
* [optional footer(s)]
EXAMPLE:
* fix: fix foo to enable bar
*
* This fixes the broken behavior of the component by doing xyz.
*
* BREAKING CHANGE
* Before this fix foo wasn't enabled at all, behavior changes from * <old> to <new>
* Closes D2IQ-12345
### Good
feat: improve performance with lazy load implementation for images
chore: update npm dependency to latest version
Fix bug preventing users from submitting the subscribe form
Update incorrect client phone number within footer body per client request
### Bad
fixed bug on landing page
Changed style
oops
I think I fixed it this time?
empty commit messages
