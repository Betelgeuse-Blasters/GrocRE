# GrocRE

FEC

## Setup
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
