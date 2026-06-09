# SUD Mission Referral Portal Bookmarklet

A bookmarklet that adds several quality-of-life improvements to the Missionary Referral Manager, helping missionaries and leaders work more efficiently.

## Installation

1. Make sure your bookmarks bar is visible.

   * **Windows/Linux:** `Ctrl + Shift + B`
   * **Mac:** `⌘ + Shift + B`

2. Right-click the bookmarks bar and select **Add page** or **Add bookmark**.

3. Enter a name for the bookmark (for example, **Referral Manager Tools**).

4. Copy and paste the following code into the **URL** or **Address** field:

```javascript
javascript: (function(){   const bookmarkletScript = document.createElement("script");   bookmarkletScript.src = "https://cdn.jsdelivr.net/gh/jaguarclaws2007-v1121-mission/SUD-mission-ref-portal-bookmarklet@main/refmanager_booklet v1.0.min.js";   document.head.append(bookmarkletScript); })();
```

5. Click **Save** or **Done**.

## Usage

1. Navigate to the Missionary Referral Manager.
2. Click the bookmark you created.
3. The bookmarklet will load and display the available tools and shortcuts.

## Notes

* The bookmarklet only works on the Missionary Referral Manager website.
* Clicking the bookmark again will disable the toolbar.
* The latest version of the script is loaded automatically from this repository.

## Questions & Support

If you have any questions, encounter a bug, or have suggestions for improvements, please open an issue in this repository or contact me by email:

[corbin.mounteer@missionary.org](mailto:corbin.mounteer+github@missionary.org?subject=Question%20about%20SUD%20Mission%20Referral%20Portal%20Bookmarklet)

