# 🚫 Aggressive Anti-AdBlock
![Project cover](/cover.png)

**Aggressive Anti-AdBlock** is an advanced JavaScript tool that robustly detects and counteracts ad blockers. It now features even more resilient detection and a persistent, self-restoring modal. If a blocker hides or removes the warning, it will reappear automatically. The script uses multiple bait techniques, AdSense-specific checks, and iframe detection to ensure ad blockers are reliably detected and users are notified until they disable them. Lightweight, flexible, and easy to customize, this solution helps maintain your site's revenue and ensures only truly supportive visitors remain. Perfect for creators who want to keep delivering quality content without compromise.


## 🆕 What's New?
- Multi-layered adblock detection: generic bait, AdSense bait, and forced-style iframe checks.
- Persistent, self-restoring modal: if hidden or altered, it is recreated automatically.
- MutationObserver and polling: ensures real-time detection and resilience against script tampering.
- Customizable warning modal: image, message, and button easily editable.
- Easy integration: just add the script, no dependencies.

---

## 🛡️ Blocked AdBlocker Extensions
The following popular ad blocker extensions will no longer work on your site after these updates:

<p align="center">
<!-- Place your 7 adblocker extension icons below -->
<img src="/icons/AdBlock.png" alt="AdBlock" width="140"/>
<img src="/icons/AdBlockUltimate.png" alt="AdBlock Ultimate" width="140"/>
<img src="/icons/AdGuard.png" alt="AdGuard" width="140"/>
<img src="/icons/AdBloq.png" alt="AdBloq" width="140"/>
<img src="/icons/MalwarebytesBrowserGuard.png" alt="Malwarebytes Browser Guard" width="140"/>
<img src="/icons/AllBlock.png" alt="AllBlock" width="140"/>
<img src="/icons/uBlockOrigin.png" alt="uBlock Origin" width="140"/>
</p>

---

## 🌟 Features
- **Advanced detection** of AdBlockers using multiple bait techniques.
- **Persistent modal** that reappears if hidden or altered by external scripts or ad blockers.
- **AdSense-specific detection** for even the most sophisticated blockers.
- **Iframe forced-style detection** to catch advanced hiding techniques.
- **Easy to integrate** into any website.


## 📥 Installation
### 1️⃣ Direct Download & Integration
Download `Aggressive-Anti-AdBlock.js` or `Aggressive-Anti-AdBlock.min.js` and add it to your website:
```html
<script src="Aggressive-Anti-AdBlock.js"></script>
```
**Or**
```html
<script src="Aggressive-Anti-AdBlock.min.js"></script>
```

### 2️⃣ Using CDN (Quick Option)
Add this script inside the `<head>` or before `</body>`:

**Standard Version**
```html
<script src="https://cdn.jsdelivr.net/gh/JStivenCM/Aggressive-Anti-AdBlock/Aggressive-Anti-AdBlock.js"></script>
```
**Minified Version**
```html
<script src="https://cdn.jsdelivr.net/gh/JStivenCM/Aggressive-Anti-AdBlock/Aggressive-Anti-AdBlock.min.js"></script>
```
⚠️ Warning: Using a direct file name like `Aggressive-Anti-AdBlock.js` or a CDN may lead to ad blockers detecting and blocking it. It is recommended to rename the file to something less obvious or integrate it directly into your website.


## ⚙️ Configuration
The script runs automatically when the page loads. To customize the modal, edit `Aggressive-Anti-AdBlock.js` and modify:

- `image.src = "https://i.postimg.cc/1tcqQJtb/stop.png";` → Change the warning image.
- `message.innerText = "Please disable your ad blocker and reload the page.";` → Modify the warning message.
- `reloadButton.innerHTML = 'Reload';` → Customize the button text.


## 🔍 Live Demo
Want to see Aggressive Anti-AdBlock in action? Check out the live demo:

➡️ **[DEMO](https://aggressive-anti-adblock.blogspot.com)**

_Remember to have ad blockers active when visiting this demo, so you can see it working._

# 📜 License
This project is licensed under the MIT License. You are free to use, modify, and distribute it without restrictions.

**Con 🩵 [JStivenCM](https://github.com/JStivenCM)**
