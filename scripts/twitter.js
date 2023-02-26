// let followedPeopleCount = 0;

// function followUsers() {
//   const followButtons = document.querySelectorAll(
//     'div[role="button"][data-testid][data-testid$="-follow"]'
//   );

//   // if (!followButtons.length || !followButtons.length > 0) {
//   //   alert("No people to follow");
//   //   return;
//   // }

//   followButtons.forEach((button, index) => {
//     setTimeout(() => {
//       button.click();
//       followedPeopleCount++;
//       chrome.runtime.sendMessage({
//         type: "followed_count",
//         count: followedPeopleCount,
//       });
//     }, index * 5000);
//   });
// }

// followUsers();

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

      const promise = new Promise((resolve, reject) => {
        // attach a click event listener to the button
        button.addEventListener("click", () => {
          // resolve the Promise when the button is clicked
          resolve();
        });
      });

      // console.log("clicking the button", button);

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

    if (action === "stop_follow") {
      console.log("Stopping the follow");
      stopFollowUsers();
    }
  });
})();

// init(); // Path: scripts\twitter.js
