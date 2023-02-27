/**
This IIFE retrieves all "Follow" buttons on the LinkedIn page, clicks each of them to follow a user, and then sends a message to the background script with the count of successfully followed users.
@returns {void}
/
(() => {
function followUsers() {
/*
This function follows the next user in the list of follow buttons, sets a timeout for a random amount of time, and sends a message to the background script with the updated count of followed users.
@returns {void}
*/
function followNextUser() {}

/**
This function stops the follow process by clearing all timeouts.
@returns {void}
*/
function stopFollowUsers() {}

/**
This function listens to messages sent from the background script and performs corresponding actions, such as stopping the follow process.
@param {Object} request - The message sent from the background script.
@param {Object} sender - The sender of the message.
@param {function} sendResponse - The function to send a response back to the sender.
@returns {void}

*/
(() => {
  let followButtons = document.querySelectorAll(
    'div[role="button"][data-testid][data-testid$="-follow"]'
  );
  let timeOutIds = [];
  let currentElement = 0;
  let currentIndex = 0;
  let followedCount = 0;

  function followUsers() {
    function followNextUser() {
      if (followButtons.length === 0) {
        return "No people to follow";
      }

      if (currentElement === followButtons.length) {
        return "No more people to follow";
      }

      const button = followButtons[currentElement];

      if (button.textContent === "Following") {
        currentElement++;
        followNextUser();
      }

      const promise = new Promise((resolve, reject) => {
        // attach a click event listener to the button
        button.addEventListener("click", () => {
          // resolve the Promise when the button is clicked
          resolve();
        });
      });

      button.click();

      promise.then(() => {
        currentIndex++;
        currentElement++;
        followedCount++;
        chrome.runtime.sendMessage({
          action: "followed_count",
          count: followedCount,
        });

        const randomTime = (Math.floor(Math.random() * 5) + 5) * 1000;
        timeOutIds.push(setTimeout(followNextUser, randomTime));
      });

      promise.catch((err) => {
        console.log("Error in button click", err);
      });
    }

    followNextUser();
  }

  followUsers();

  function stopFollowUsers() {
    timeOutIds.forEach((id) => {
      clearTimeout(id);
    });
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { action } = request;
    console.log("action", action);

    if (action === "stop_follow") {
      console.log("Stopping the follow");
      stopFollowUsers();
    }
  });
})();
