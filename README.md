# video-chat-playground

### Requirements

-   Node **v12**
-   Yarn
-   openssl

### Running

Prerequisite:

1.  `nvm use`

To run the server:

1.  `./scripts/generate-ssl.sh`
1.  `yarn install`
1.  `yarn server:start`
1.  open https://localhost:9876/start and accept the SSL exception

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

### Inspisarion --> **Video chat via WebRTC** series

1.  [Data Stream from your Webcam and Microphone](https://levelup.gitconnected.com/data-stream-from-your-webcam-and-microphone-videochat-with-javascript-step-1-29895b70808b)
1.  [Set up a Connection over WebSocket](https://levelup.gitconnected.com/set-up-a-connection-over-websocket-videochat-with-javascript-step-2-f78c307c4fd3)
1.  [Establish the WebRTC Connection](https://levelup.gitconnected.com/establishing-the-webrtc-connection-videochat-with-javascript-step-3-48d4ae0e9ea4)
1.  [Find Your Contact](https://levelup.gitconnected.com/find-your-contact-videochat-with-javascript-step-4-4d527576b8cf)
1.  [Share your screen with WebRTC](https://levelup.gitconnected.com/share-your-screen-with-webrtc-video-call-with-webrtc-step-5-b3d7890c8747)
1.  [Send Files over a Data Channel](https://levelup.gitconnected.com/send-files-over-a-data-channel-video-call-with-webrtc-step-6-d38f1ca5a351)
