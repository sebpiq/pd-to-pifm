Pd to pifm
============

With this you should be able to send audio from pd to the pifm. Pd can run either on the pi or on your own computer.

Instructions
--------------

To make it work :

1. We need the `[udpsend~]` external for Pure Data, so install the `mrpeach-net` package. On raspbian `stretch` or higher, you can install it by running:
    
    ```
    sudo apt-get install pd-mrpeach-net
    ```

2. Install [node.js](https://nodejs.org)
3. Run the node script with the command `sudo $(which node) udpreceive.js` (we need `sudo` here because of pifm).
4. Run the example pure data patch `pd -nogui -noaudio udpsend.pd`.
    - **NB1** : depending on how you installed the `mrpeach-net` package and your version of pd, you might need to rename the `[udpsend~]` object to `[net/udpsend~]`
    - **NB2** : pd doesn't need to run on the pi, it can run on your computer. For this, in `udpsend.pd` replace `localhost` by your pi's IP address.
