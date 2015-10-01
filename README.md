# PubNub Access Manager Chat Demo

[Try the live demo!](https://pubnub-auth-chat.herokuapp.com/)
(You need a GitHub ccount to login to the chat demo!)

This simple demo is written is JavaScript for both client (JavaScript) and server (Node.js) to demonstrate how PubNub Access manager works and how you can implement in your app.

Once a user login, the user is given a auth token from OAuth. In this demo, the token is used as an `auth_key` that the "admin" can reference to grant a read/write permission to the user.


## What is PubNub Access Manager?

[PubNub Access Manager](https://www.pubnub.com/docs/web-javascript/pam-security) extends PubNub's existing security framework by allowing developers to create and enforce secure access to channels throughout the PubNub Real Time Network. What Access Manager does are:

- Syndicate streams by providing authorization to users to read/write messages to one or more channels
- Grant/revoke permissions for your real time streams at the user/device, channel or key level
- Works with Auth tokens from any existing authentication system: Facebook Connect, Twitter, Google, LDAP, or homegrown solutions


### Message Verification with ECC

Messages are encrypted with Elliptic curve cryptography (ECC) asymmetric algorithm, to avoid some trolls to spoof users.

To learn more about the digital signature, read [Chat Security: User Identification with Digital Signature Message Verification](http://www.pubnub.com/blog/chat-security-user-identification-with-digital-signature-message-verification/) on PubNub Blog.

## Running this Demo Locally

You need to run this demo on your own machine. Make sure your machine has [Node.js](https://nodejs.org/) installed.

1. Fork or download this repo to your local machine.
2. Install dependencies: `$ npm install`
3. Set up your app on [GitHub Developer applications](https://github.com/settings/applications/) (for OAuth)
4. Include your own `config.js` file and save it at root of your app dir (See below)
5. Run code: `$ node index.js`
6. Open the web client at [http://localhost:3000](http://localhost:3000)


### config.js

Create a file with your own credintials:

```javascript
module.exports = {
  auth: {
    github: {
      client_id: '614733a4294d....', // Get them from GitHub
      client_secret: '486e17d613bd...',
    }
  },
  pubnub: {
    secret_key: 'sec-c-M2U0NDI3....', // get it from PubNub Admin portal
    auth_key: '...' // any string you want
  }
};
```
