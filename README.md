Pd to pifm
============

With this you should be able to send audio from pd to the pifm. Pd can run either on the pi or on your own computer.

Instructions
--------------

To make it work :

1. We need the `[udpsend~]` external for Pure Data, so install the `net` package. You can find it with deken for example.
2. Install [node.js](https://nodejs.org)
3. Run the node script with the command `node udpreceive.js`
4. Run the example pure data patch `udpsend.pd` (if you are having problems with your sound driver, you can start Pd with the `--noaudio` switch, it will work).