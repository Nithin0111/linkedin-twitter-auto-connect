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
    const twitterRegex =
      /^https?:\/\/twitter\.com\/search\?.*?&src=.*?&f=user$/;
    const linkedinRegex =
      /^https?:\/\/www\.linkedin\.com\/search\/results\/people\/.*?$/;
    if (tab.url && twitterRegex.test(tab.url)) {
      await chrome.runtime.onMessage.addListener(
        async (request, sender, sendResponse) => {
          try {
            const { action } = request;
            console.log("action", action);
            if (action === "start_follow") {
              // await chrome.tabs.query(
              //   { active: true, currentWindow: true },
              //   async (tabs) => {
              //     await chrome.scripting.executeScript({
              //       target: { tabId: tabs[0].id },
              //       files: ["scripts/twitter.js"],
              //     });
              //   }
              // );
              await chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["scripts/twitter.js"],
              });
            } else if (action === "stop_follow") {
              await chrome.tabs.sendMessage(tabId, {
                action: "stop_follow",
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      );
    } else if (tab.url && linkedinRegex.test(tab.url)) {
      await chrome.runtime.onMessage.addListener(
        async (request, sender, sendResponse) => {
          try {
            const { action } = request;
            console.log("action", action);
            if (action === "start_connect") {
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
