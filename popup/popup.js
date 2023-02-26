// let circularProgress = document.querySelector(".circular-progress");
// let progressValue = document.querySelector(".progress-value");

// let progressStartValue = 0,
//   progressEndValue = 100,
//   speed = 100;

// let followedPeopleCount = 0;

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   const { type, count } = request;
//   let progressValue = document.querySelector(".progress-value");
//   let circularProgress = document.querySelector(".circular-progress");

//   let progressStartValue = 0,
//     progressEndValue = 100;

//   if (type === "followed_count") {
//     console.log("In here", count);
//     console.log(progressValue, "progressValue");
//     progressValue.textContent = `${count}`;
//     circularProgress.style.background = `conic-gradient(#0073b1 ${
//       progressStartValue * 3.6
//     }deg, #ededed 0deg)`;
//     progressStartValue = count;
//   }
// });

async function connectEventTrigger() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const connectBtnEl = document.querySelector("#connect-btn");

  connectBtnEl.addEventListener("click", async () => {
    console.log("clicked", connectBtnEl.innerText);
    if (
      connectBtnEl.innerText.toLowerCase() === "Stop connecting".toLowerCase()
    ) {
      connectBtnEl.innerText = "Start connecting";
      if (tab.url.includes("linkedin.com")) {
        await chrome.runtime.sendMessage({ action: "stop_connect" });
      } else if (tab.url.includes("twitter.com")) {
        await chrome.runtime.sendMessage({ action: "stop_follow" });
      }
    } else if (
      connectBtnEl.innerText.toLowerCase() === "Start connecting".toLowerCase()
    ) {
      connectBtnEl.innerText = "Stop connecting";
      if (tab.url.includes("linkedin.com")) {
        await chrome.runtime.sendMessage({ action: "start_connect" });
      } else if (tab.url.includes("twitter.com")) {
        await chrome.runtime.sendMessage({ action: "start_follow" });
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const mainContent = document.querySelector(".main-content");
  if (tab.url.includes("linkedin.com") || tab.url.includes("twitter.com")) {
    const invitationsProgressDiv = document.createElement("div");
    invitationsProgressDiv.classList.add("invitations-progress");

    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container");

    const textSpan = document.createElement("span");
    textSpan.classList.add("text");
    textSpan.innerText = "Invitation count";

    const circularProgressDiv = document.createElement("div");
    circularProgressDiv.classList.add("circular-progress");

    const progressValueSpan = document.createElement("span");
    progressValueSpan.classList.add("progress-value");
    progressValueSpan.innerText = "0";

    circularProgressDiv.appendChild(progressValueSpan);

    containerDiv.appendChild(textSpan);
    containerDiv.appendChild(circularProgressDiv);

    invitationsProgressDiv.appendChild(containerDiv);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const connectBtn = document.createElement("button");
    connectBtn.type = "button";
    connectBtn.classList.add("connect-btn");
    connectBtn.id = "connect-btn";
    connectBtn.innerText = "Start connecting";

    buttonsDiv.appendChild(connectBtn);

    mainContent.appendChild(invitationsProgressDiv);
    mainContent.appendChild(buttonsDiv);

    await connectEventTrigger();

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      const { action, count } = request;
      let progressValue = document.querySelector(".progress-value");
      let circularProgress = document.querySelector(".circular-progress");

      let progressStartValue = 0,
        progressEndValue = 100;

      if (action === "followed_count") {
        console.log("In here", count);
        console.log(progressValue, "progressValue");
        progressValue.textContent = `${count}`;
        progressStartValue = count;
        circularProgress.style.background = `conic-gradient(#0073b1 ${
          progressStartValue * 3.6
        }deg, #ededed 0deg)`;
      }
    });
  } else {
    mainContent.innerHTML = `<p class="message-text">This extension is not supported on this website.</p>`;
  }
});
