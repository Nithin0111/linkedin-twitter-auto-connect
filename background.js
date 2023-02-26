// chrome.runtime.onMessage.addListener(async function (
//   request,
//   sender,
//   sendResponse
// ) {
//   const { action, tabInfo: tab } = request;
//   console.log("action", action);

//   if (action === "start_connect") {
//     await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       files: ["scripts/content-script.js"],
//     });
//     console.log("Script injected");
//   } else if (action === "stop_connect") {
//     console.log("Script stopped");
//   }
// });

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    if (
      (tab.url && tab.url.includes("twitter.com")) ||
      tab.url.includes("linkedin.com")
    ) {
      console.log("tabId", tabId, tab);
      await chrome.runtime.onMessage.addListener(
        async (request, sender, sendResponse) => {
          try {
            const { action } = request;
            if (action === "start_follow") {
              await chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["scripts/twitter.js"],
              });
            } else if (action === "stop_follow") {
              await chrome.tabs.sendMessage(tabId, {
                action: "stop_follow",
              });
            } else if (action === "start_connect") {
              await chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["scripts/linkedin.js"],
              });
            } else if (action === "stop_connect") {
              await chrome.tabs.sendMessage(tabId, {
                action: "stop_connect",
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  }
});
