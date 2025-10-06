# 🚫 Agressive Anti-AdBlock  
![Project cover](/cover.png)

Is an advanced JavaScript tool that robustly detects and counteracts ad blockers. It employs a persistent, self-restoring modal technique—ensuring that if a blocker hides or removes the warning, it will reappear. With a lightweight design and flexible customization, this solution helps maintain your site's revenue while ensuring that only visitors who truly appreciate your content (and are willing to disable their ad blocker to support you) remain. Perfect for creators who want to keep delivering quality content without compromise.

## 🌟 Features  
- **Advanced detection** of AdBlockers using a bait technique.  
- **Persistent modal** that reappears if hidden by external scripts.  
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

# 2️⃣ Using CDN (Quick Option)
Add this script inside the ```<head>``` or before ```</body>```:

**Standard Version**
```html
<script src="https://cdn.jsdelivr.net/gh/JStivenCM/Aggressive-Anti-AdBlock/Aggressive-Anti-AdBlock.js"></script>
```
**Minified Version**
```html
<script src="https://cdn.jsdelivr.net/gh/JStivenCM/Aggressive-Anti-AdBlock/Aggressive-Anti-AdBlock.min.js"></script>
```
⚠️ Warning: Using a direct file name like ```Agressive-Anti-AdBlock.js``` or a CDN may lead to ad blockers detecting and blocking it.
It is recommended to rename the file to something less obvious or integrate it directly into your website.

# ⚙️ Configuration
The script runs automatically when the page loads. If you want to customize it, edit ```Agressive-Anti-AdBlock.js``` and modify the following elements:

- ```image.src = "https://i.postimg.cc/1tcqQJtb/stop.png";``` → Change the warning image.
- ```message.innerText = "Please disable your ad blocker and reload the page.";``` → Modify the warning message.
- ```reloadButton.innerHTML = 'Reload';``` → Customize the button text.

## 🔍 Live Demo  
Want to see Agressive-Anti-AdBlock in action? Check out the live demo:  

➡️ **[DEMO](https://aggressive-anti-adblock.blogspot.com)**  

_Remember to have ad blockers active when visiting this demo, so you can see it working._

# 📜 License
This project is licensed under the MIT License. You are free to use, modify, and distribute it without restrictions.

**Con 🩵 [JStivenCM](https://github.com/JStivenCM)**
