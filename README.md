# Elecctro React Challenge
## Setup
- Create a new project called `elecctro` using the `create-react-app` command.
- I installed `eslint` to enforce the AirBnB code style.
- I will use [Sass](https://sass-lang.com/) to style the application.

# The To-Do List
This is my first attempt to use and implement [Sass](https://sass-lang.com/) in React and does not reflect the best practices,
although I am confident that I will be able to implement this in the future.

To manage sorting the list, I have created a custom hook `useCycle` which will cycle through the list of items, in this case, 
cycle through the sort option `asc`, `desc`, and `null`.

For storing the items in the local storage, I have created a custom hook `useLocalStorage` which will store the items in the local storage with
ease given a key and value of any type (generic).

For the TDD approach, I have used the React Testing Library combined with Jest to test the components and the logic of the system.
Admittedly, I have had difficulty with testing components that use the `useState` hook and not been able to implement
tests for the `useLocalStorage` hook.

## Few things to note
- First, I want to apologise for the lack of comments in this challenge. I have tried to make the code as readable as possible 
but due to my missed deadline, I have not been able to complete the challenge as I had planned.
- Due to exam week, I have worked an average of 1.5 - 2.0 hours per day in this challenge. In reality, I would not have taken even half as long
as I have to complete a simple To-Do list application such as this.

### Planned Features
**What I was aiming to complete if I had time:**
- Add a search bar to filter the list of items.
- Add beautiful animations to the entire app via [framer-motion](https://framer.com/motion/).
- Add a dark mode to the app.
- Add an undo functionality to the app.
- User authentication.
- Play around with E2E testing to make the app even more user-friendly and robust.
- 
#### Final Remarks
Until I receive a response from the instructor, I will continue to work on this challenge to try to make up for and 
improve on my lack of time. I have also noticed in my IDE (WebStorm), that my git tree seems to ignore the fact that I have
created and merged branches.
