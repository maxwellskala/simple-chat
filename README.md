# simple-chat
A simple chat app built with React and PubNub.

## Commands
To start server, run `npm start` from the top-level directory (where `package.json` is). Open browser and navigate to `localhost:8080`.

To test, run `npm run test` from the top-level directory.

## Using the app
Upon loading the app, you will be prompted to pick a user from the two hardcoded options. Once you've selected a user, the chat history will be displayed in typical fashion, with your account's sent messages on the right side of the screen, and the other account's sent messages on the left side of the screen. To switch users, simply refresh the page and pick a new one. Your old messages will still persist (up to the 50 most recent messages).
