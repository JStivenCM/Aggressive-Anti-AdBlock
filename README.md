# 🚫 Aggressive Anti-AdBlock
![Project cover](/cover.png)

**Aggressive Anti-AdBlock** is an advanced JavaScript tool that robustly detects and counteracts ad blockers. It now features **aggressive persistence mechanisms**, **smart resource optimization**, and **multi-vector detection**. If a blocker hides or removes the warning, it re-appears instantly, immune to simple CSS hiding tricks or DOM deletion. The script uses multiple bait techniques, AdSense-specific scanning, and iframe detection to ensure ad blockers are reliably detected. Lightweight, flexible, and CPU-friendly thanks to its new cooling system.

## 🆕 What's New? (Version 2.0 Optimized)
- **Aggressive Persistence**: The modal now actively protects itself by **rotating its HTML ID** every second and enforcing `!important` styles. This prevents users from hiding it using static CSS rules or Developer Tools.
- **Smart Cooling System**: To save your users' CPU, the detection loop switches from "Aggressive" to "Passive" mode after 30 seconds. It re-engages instantly if the user switches tabs or reloads.
- **Cache-Busting Bait Refresh**: The script actively moves bait elements in the DOM to force the browser to re-evaluate styles, defeating blockers that rely on cached rules.
- **Enhanced AdSense Shield**: Now scans **all** AdSense units on the page for class manipulation or hidden attributes, ensuring legitimate ads aren't silently blocked.
- **Anti-Tamper Logic**: Detects and fixes advanced evasion techniques like negative `z-index`, `clip-path` masking, and `opacity` hacks.

---

## 🛡️ Blocked AdBlocker Extensions
The following popular ad blocker extensions will no longer work on your site after these updates:  
The script works with most extensions; however, some employed advanced techniques to evade detection. With the latest changes, these and many others are no longer effective.

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
- **Advanced detection** of AdBlockers using multiple bait techniques (Generic & AdSense).
- **Self-Healing Modal** that regenerates if deleted from the DOM.
- **CSS-Proof Design**: Rotates IDs and checks for `visibility`, `display`, `opacity`, `z-index`, and `clip-path`.
- **Iframe forced-style detection** to catch advanced hiding techniques.
- **Performance Optimized**: Uses `requestAnimationFrame` principles and idle checks (Cool-down mode).
- **Easy to integrate** into any website.


## 📥 Installation
### 1️⃣ Direct Download & Integration
Download `Aggressive-Anti-AdBlock.js` or `Aggressive-Anti-AdBlock.min.js` and add it to your website:
```html
<script src="assets/js/Aggressive-Anti-AdBlock.js"></script>
```
or
```html
<script src="assets/js/Aggressive-Anti-AdBlock.min.js"></script>
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
⚠️ Warning: Using a direct file name like `Aggressive-Anti-AdBlock.js` or a CDN may lead to ad blockers detecting and blocking it via URL filtering. It is strongly recommended to copy the code from `Aggressive-Anti-AdBlock.js` and integrate it directly into your main JS bundle or rename the file.


## ⚙️ Configuration
The script runs automatically when the page loads. To customize the modal, edit the `config` object in the script:

- `checkInterval`: Time in ms between checks (default: `2000`).
- `image.src`: Change the warning image URL.
- `message.innerText`: Modify the warning text.
- `reloadButton.innerHTML`: Customize the button text/icon.


## 🔍 Live Demo
Want to see Aggressive Anti-AdBlock in action? Check out the live demo:

➡️ **[DEMO](https://aggressive-anti-adblock.blogspot.com)**

_Remember to have ad blockers active when visiting this demo, so you can see it working._

# 📜 License
This project is licensed under the MIT License. You are free to use, modify, and distribute it without restrictions.

**Con 🩵 [JStivenCM](https://github.com/JStivenCM)**
