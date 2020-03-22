# video-chat-playground

### Requirements:

-   Node **v12**
-   Yarn
-   openssl

### Running

To run the server:

1.  `./scripts/generate-ssl.sh`
1.  `yarn install`
1.  `yarn server:start`
1.  open https://localhost:9876 and accept the SSL exception

To run the client:

1.  open new terminal
1.  `yarn client:start`
1.  open https://localhost:9000

As an alternative for `client:start`, run:

1.  `./scripts/generate-ssl.sh` - in case you've missed it before ;)
1.  `yarn client:build`
1.  `yarn client:serve`

to serve the client app from static files.

### Non-development machine

1.  run `ifconfig` on your **development machine** and check local network **IP**
1.  add `[above IP] videochat-playground.local` into `/etc/hosts` file of a machine you want to test this app on
1.  open https://videochat-playground.local:9876 and accept the SSL exception
1.  open https://videochat-playground.local:9000

<!--
### Tips

-   To fix websocket in local environment, open DevTools -> Console, click failed URL, change protocol from `wss` to `https`, and accept the SSL exception. Then, refresh the app. -->

### Based on

1.  [Data Stream from your Webcam and Microphone: VideoChat with JavaScript](https://levelup.gitconnected.com/data-stream-from-your-webcam-and-microphone-videochat-with-javascript-step-1-29895b70808b)
1.  [Set Up a Connection Over WebSocket: VideoChat with JavaScript](https://levelup.gitconnected.com/set-up-a-connection-over-websocket-videochat-with-javascript-step-2-f78c307c4fd3)
