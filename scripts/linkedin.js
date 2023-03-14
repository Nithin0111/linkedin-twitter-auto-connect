/**
This function retrieves all "Connect" buttons on the LinkedIn page, clicks each of them to send a connection request, and then sends a message to the background script with the count of successfully connected users.
@returns {void}
*/
function connectUsers() {}
/**

This function stops the connection process by clearing all timeouts.
@returns {void}
*/
function stopConnecting() {}
/**

This function listens to messages sent from the background script and performs corresponding actions, such as stopping the connection process.
@param {Object} request - The message sent from the background script.
@param {Object} sender - The sender of the message.
@param {function} sendResponse - The function to send a response back to the sender.
@returns {void}
*/
function onMessageListener(request, sender, sendResponse) {}
/**

This function initializes the connection process by calling the connectUsers function, and listens for messages from the background script.
@returns {void}
*/
function main() {
  let connectButtons = document.querySelectorAll(
    "button[aria-label^='Invite'] span.artdeco-button__text"
  );

  console.log("connectButtons", connectButtons);

  let timeOutIds = [];
  let currentElement = 0;
  let currentIndex = 0;
  let connectedCount = 0;

  function connectUsers() {
    function connectNextUser() {
      if (connectButtons.length === 0) {
        return "No people to connect";
      }

      if (currentElement === connectButtons.length) {
        return "No more people to connect";
      }

      const button = connectButtons[currentElement];

      const promise = new Promise((resolve, reject) => {
        // attach a click event listener to the button
        button.addEventListener("click", () => {
          // resolve the Promise when the button is clicked
          resolve();
        });
      });

      button.click();

      setTimeout(() => {
        if (button.innerText !== "Pending") {
          reject(new Error("Button not clicked"));
        }
      }, 5000);

      promise.then(() => {
        let sendNoteButton = document.querySelector(
          "button[aria-label='Send now']"
        );

        if (sendNoteButton) {
          sendNoteButton.click();
          console.log("Inside sendNoteButton");
        }

        currentIndex++;
        currentElement++;
        connectedCount++;
        chrome.runtime.sendMessage({
          action: "followed_count",
          count: connectedCount,
        });

        const randomTime = (Math.floor(Math.random() * 5) + 5) * 1000;
        timeOutIds.push(setTimeout(connectNextUser, randomTime));
      });

      promise.catch((err) => {
        console.log("Error in button click", err);
        chrome.notification.create("error", {
          type: "basic",
          iconUrl: "../icons/icon-32.png",
          title: "Error",
          message: "Connect Button not clicked",
          requireInteraction: true,
          timeout: 5000,
        });
      });
    }

    connectNextUser();
  }

  connectUsers();

  function stopConnecting() {
    timeOutIds.forEach((id) => {
      clearTimeout(id);
    });
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { action } = request;

    if (action === "stop_connect") {
      stopConnecting();
    }
  });
}

main(); // Path: scripts\linkedin.js
