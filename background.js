/**

This function listens for changes in the status of a tab and executes code accordingly.

@param {number} tabId - The ID of the tab whose status changed.

@param {Object} changeInfo - An object containing information about the change in status.

@param {Object} tab - An object representing the updated tab.

@returns {void}
*/
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  // check if the tab has completed loading
  if (changeInfo.status === "complete") {
    const twitterRegex =
      /^https?:\/\/twitter\.com\/search\?.*?&src=.*?&f=user$/;
    // if the tab's URL matches the Twitter search results page
    const linkedinRegex =
      /^https?:\/\/www\.linkedin\.com\/search\/results\/people\/.*?$/;
    // if the tab's URL matches the LinkedIn search results page
    if (tab.url && twitterRegex.test(tab.url)) {
      // listen for messages
      await chrome.runtime.onMessage.addListener(
        async (request, sender, sendResponse) => {
          try {
            const { action } = request;
            console.log("action", action);
            if (action === "start_follow") {
              // execute the Twitter script to start following users
              await chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["scripts/twitter.js"],
              });
            } else if (action === "stop_follow") {
              // send a message to the Twitter script to stop following users
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
              // execute the LinkedIn script to start connecting users
              await chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["scripts/linkedin.js"],
              });
            } else if (action === "stop_connect") {
              // send a message to the LinkedIn script to stop connecting users
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
