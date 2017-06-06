# simple-chat
A simple chat app built with React and PubNub.

## Commands
To start server, run `npm start` from the top-level directory (where `package.json` is). Open browser and navigate to `localhost:8080`.

To test, run `npm run test` from the top-level directory.

## Using the app
Upon loading the app, you will be prompted to pick a user from the two hardcoded options. Once you've selected a user, the chat history will be displayed in typical fashion, with your account's sent messages on the right side of the screen, and the other account's sent messages on the left side of the screen. To switch users, simply refresh the page and pick a new one. Your old messages will still persist (up to the 50 most recent messages).

To see the messaging in action, simply open two tabs to `localhost:8080` and choose a different user in each tab. Your messages will automatically propogate from tab to tab via the PubNub API.

### API Key
You will need your own PubNub API key. Get them for free on their site, and then export them from a file called `ApiKeys.js` in the `src` directory.

## Notes
Per the prompt, I was not supposed to re-use code I had previously written. However, I had a few Enzyme-based testing utility functions for a different project [here](https://github.com/maxwellskala/cs-training-tracker/blob/master/client/src/tests/utils.js) which I actually did shamelessly copy/paste into this new project. It felt silly to re-write those from scratch when they're simply thin wrappers around the Enzyme ShallowWrapper that I like so I can keep test implementation specifics out of my actual test files as much as possible.
