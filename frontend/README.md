# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## How to Fix

### 1. **Open a terminal and navigate to the frontend directory:**

```powershell
cd frontend
```

### 2. **Then install dependencies:**

```powershell
yarn install
```
or
```powershell
npm install
```

### 3. **Start the frontend app:**

```powershell
yarn start
```
or
```powershell
npm start
```

---

**Summary:**  
Always run frontend commands (`yarn install`, `npm install`, `yarn start`) inside the `frontend` folder, not the project root.

If you need to run the backend, let me know and I’ll guide you through that as well!

---

## How to Run the Frontend

1. **Change directory to the frontend folder:**
   ```powershell
   cd frontend
   ```

2. **Install dependencies (if you haven't already):**
   ```powershell
   npm install
   ```
   or
   ```powershell
   yarn install
   ```

3. **Start the frontend app:**
   ```powershell
   npm start
   ```
   or
   ```powershell
   yarn start
   ```

---

**Summary:**  
Always run `npm start` or `yarn start` inside the `frontend` folder, not the project root.

If you need help running the backend, let me know!

---

'craco' is not recognized as an internal or external command,
operable program or batch file.

---

## How to Fix

1. **Make sure you are in the `frontend` directory.**

2. **Install all dependencies (including craco) with:**
   ```powershell
   npm install
   ```
   or
   ```powershell
   yarn install
   ```

   This will install `@craco/craco` (which is listed in your `package.json` as a devDependency) and make it available for use.

3. **After installation completes, start the app again:**
   ```powershell
   npm start
   ```
   or
   ```powershell
   yarn start
   ```

---

**If you already ran `npm install` or `yarn install` and still get this error:**
- Try deleting the `node_modules` folder and the `yarn.lock` or `package-lock.json` file, then run the install command again:
  ```powershell
  rm -r node_modules
  rm yarn.lock # or rm package-lock.json if using npm
  npm install
  ```
  or
  ```powershell
  yarn install
  ```

---

Let me know if this solves the problem or if you get a different error!
