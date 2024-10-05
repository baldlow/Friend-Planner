# Friend Planner

This is the start of the friend Planner
Here’s a simple yet structured `README.md` file for your "Friend Planner" project that you can use to guide your team. This README explains the project, the structure, and how the team can contribute effectively:

---

## Friend Planner

### Project Overview
**Friend Planner** is a tool designed to help groups find common availability by allowing users to input their schedules and see overlapping free times. It's intended to simplify scheduling group events by visually showing when everyone is free.

### Table of Contents
1. [Project Structure](#project-structure)
2. [Getting Started](#getting-started)
3. [Setting Up the Repository](#setting-up-the-repository)
4. [Git Workflow](#git-workflow)
5. [Contributing Guidelines](#contributing-guidelines)
6. [Feature Breakdown](#feature-breakdown)
7. [Communication](#communication)

### Project Structure
- `index.html`: Main HTML file for the landing page.
- `styles/`: Folder for CSS stylesheets.
  - `main.css`: Main stylesheet.
- `scripts/`: Folder for JavaScript files.
  - `availability.js`: Manages user availability inputs.
- `backend/`: Backend code (e.g., Node.js/Express API).
  - `server.js`: Main server file.
- `README.md`: This file.
- `.github`: Contains GitHub-specific files like issue templates and pull request templates.

### Getting Started
Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/Friend-Planner.git
   cd Friend-Planner
   ```

2. **Install Dependencies** (if any):
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm start
   ```
   This command will start the server and open the app in your default browser.

### Setting Up the Repository
Before starting any work, make sure to create your own feature branch. **Do not push changes directly to the `main` branch.** This helps us keep the code organized and prevents issues when multiple people are working on the same files.

1. **Create a New Branch**:
   ```bash
   git checkout -b feature-branch-name
   ```

2. **Push Your Branch**:
   ```bash
   git push origin feature-branch-name
   ```

### Git Workflow
1. **Pull the Latest Changes** from the `main` branch before starting new work:
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a Branch** for your work:
   ```bash
   git checkout -b feature-branch-name
   ```

3. **Make Your Changes and Commit**:
   ```bash
   git add .
   git commit -m "Description of the changes made"
   ```

4. **Push Your Branch** to GitHub:
   ```bash
   git push origin feature-branch-name
   ```

5. **Open a Pull Request**:
   - Go to the repository on GitHub.
   - Click **Pull Requests**.
   - Click **New Pull Request**.
   - Select your branch and describe the changes.

6. **Request a Review**:
   - Request another team member to review your changes.

7. **Resolve Conflicts** (if any) and **Merge**:
   - Once approved, you can merge your branch into `main`.

### Contributing Guidelines
To keep things organized, follow these guidelines:

- **Always Pull First**: Make sure your branch is up-to-date with the latest `main` branch.
- **Commit Frequently**: Small commits help us track changes better.
- **Descriptive Commit Messages**: Use messages like `Added calendar UI` instead of `Fixed stuff`.
- **Create Issues for Bugs or Features**: Even if you’re working on it, create an issue to track the progress.
- **Review PRs**: Always review others' pull requests and give constructive feedback.

### Feature Breakdown
Here’s a breakdown of some features and who can take the lead on each:

1. **Frontend**:
   - **HTML Structure**: Create the landing page, input forms, and display components.
   - **CSS Styles**: Design a clean layout that is easy to read and use.
   - **JavaScript**: Handle user interactions, form submissions, and data visualization.

2. **Backend**:
   - **API Endpoints**: Build endpoints for storing and retrieving user schedules.
   - **Database Setup**: Set up a small database (MongoDB, Firebase, or a simple file-based approach).

3. **Integration**:
   - Ensure that the frontend and backend work together.
   - Implement schedule overlap logic.


### Additional Resources
- [GitHub Docs](https://docs.github.com/en)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [HTML & CSS Basics](https://www.w3schools.com/html/html_intro.asp)

---
