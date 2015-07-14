# PubNub PAM Chat Demo

[Try the live demo!](https://pubnub-pam-chat.herokuapp.com/)
(You need a GitHub ccount to login to the chat demo!)

This simple demo is written is JavaScript for both client (JavaScript) and server (Node.js) to demonstrate how PubNub Access manager (PAM) works and how you can implement in your app.

Once a user login, the user is given a auth token from OAuth. In this demo, the token is used as an `auth_key` that the "admin" can reference to grant a read/write permission to the user.


## What is PubNub Access manager (PAM)?

[PubNub Access Manager (PAM)](https://www.pubnub.com/docs/web-javascript/pam-security) extends PubNub's existing security framework by allowing developers to create and enforce secure access to channels throughout the PubNub Real Time Network. What PAM does are:

- Syndicate streams by providing authorization to users to read/write messages to one or more channels
- Grant/revoke permissions for your real time streams at the user/device, channel or key level
- Works with Auth tokens from any existing authentication system: Facebook Connect, Twitter, Google, LDAP, or homegrown solutions



## Running this demo locally

You need to run this demo on your own machine. Make sure your machine has [Node.js][node] installed.

1. Fork or download this repo to your local machine.
2. Install dependencies: `$ npm install`
3. Run code: `$ node index.js`
4. Open the web client at http://localhost:3000
5. Login using your GitHub account
6. Chat!


