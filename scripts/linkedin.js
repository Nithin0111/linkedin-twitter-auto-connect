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

    // switch (action) {
    //   case "start":
    //     sendResponse(followUsers());
    //     break;
    //   case "stop":
    //     stopFollowUsers();
    //     break;
    //   case "followed_count":
    //     progressValue.textContent = `${count}`;
    //     circularProgress.style.background = `conic-gradient(#0073b1 ${
    //       progressStartValue * 3.6
    //     }deg, #ededed 0deg)`;
    //     progressStartValue = count;
    //     break;
    //   default:
    //     break;
    // }

    if (action === "stop_connect") {
      stopConnecting();
    }
  });
}

main(); // Path: scripts\linkedin.js
