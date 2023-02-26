# LinkedIn Connect and Twitter Follow Chrome Extension Called Auto Connect Bot
This Chrome extension enables you to connect with people on LinkedIn or follow users on Twitter in bulk. It is designed to work on the first page of search results.

### Installation
To install this extension, follow the steps below:

1. Clone the repository or download the ZIP file and extract it.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable Developer mode by clicking the toggle switch in the top right corner of the page.
4. Click `Load unpacked` and select the folder where you extracted the extension.

### Usage
#### LinkedIn Connect
1. Go to [linkedin.com](https://linkedIn.com/in) and perform a search for the people you want to connect with.
2. Click on the Auto Connect Bot Chrome Extension icon in the top right corner of your browser window.
3. The extension will click the Connect button for each person on the page. If the person has a Message button instead of a Connect button, they will be skipped.
4. The extension will wait a random amount of time between 5-10 seconds before clicking the next Connect button.

#### Twitter Follow
1. Go to Twitter.com and perform a search for the users you want to follow.
2. Click on the Auto Connect Bot Chrome Extension icon in the top right corner of your browser window.
3. The extension will click the Follow button for each user on the page.
4. The extension will wait a random amount of time between 5-10 seconds before clicking the next Follow button.

#### Architecture
The LinkedIn Connect and Twitter Follow Chrome Extension is built using vanilla JavaScript and the Chrome extension APIs. It consists of a popup window, a content script, and a background script.

#### Popup Window
The popup window is the user interface of the extension. It contains a dropdown menu to select whether to connect on LinkedIn or follow on Twitter.

#### Content Script
The content script is injected into the LinkedIn or Twitter search results page. It is responsible for finding the Connect or Follow buttons on the page and clicking them.

#### Background Script
The background script runs in the background of the extension. It listens for messages from the content script and popup window and performs corresponding actions, such as stopping the connection or follow process.

#### Code
The code for the LinkedIn Connect and Twitter Follow Chrome Extension is minimal and clean. It is written in vanilla JavaScript and follows best practices for Chrome extension development.

#### Limitations
The extension only works on the first page of search results. It does not work on subsequent pages or on profiles that are not included in the search results. Additionally, it cannot handle LinkedIn's rate limiting or account restrictions. Use at your own risk.

#### Future Scope
1. Support for multiple pages of search results
2. Integration with third-party services to enhance the extension's functionality.
3. Support for custom wait times between clicks.
4. Support for selecting specific people or users to connect with or follow.
5. Implementation of rate limiting to prevent the extension from being blocked by LinkedIn or Twitter.

#### Improvements
1. Add a loading indicator to the popup window to indicate when the extension is working.
2. Improve the randomization of wait times between clicks to make it more realistic and human-like.

#### More Features
1. Support for customizing the message sent when connecting on LinkedIn or following on Twitter.
2. Support for selecting multiple search filters, such as location, industry, and job title.
3. Implementation of a dashboard to track connection and follow requests.
4. Integration with a CRM or lead generation tool to store connections and followers.

#### License
This extension is released under the MIT License.
