document.addEventListener("DOMContentLoaded", function () {
    // Generates a unique identifier for each warning modal
    function generateUniqueId() {
        return "anti-adblock-" + Math.random().toString(36).substr(2, 9);
    }

    // Creates and displays the warning modal when an ad blocker is detected
    function createAdblockWarning() {
        const modalId = generateUniqueId();

        // Removes any previous modal to avoid duplicates
        let existingModal = document.querySelector("[id^='anti-adblock-']");
        if (existingModal) existingModal.remove();

        // Creates the modal container
        const modal = document.createElement("div");
        modal.id = modalId;
        modal.style = `
            position: fixed; top: 0; left: 0; width: 100%;
            height: 100%; background: rgba(0, 0, 0, 0.5);
            color: #242424; font-family: Arial, sans-serif;
            z-index: 99999; display: flex; align-items: center;
            justify-content: center; flex-direction: column;
            backdrop-filter: blur(5px);
        `;

        /// Modal content container
        const modalContent = document.createElement("div");
        modalContent.style = `
            max-width: 600px; width: 90%; padding: 20px; background: white;
            border-radius: 15px; box-shadow: 0 0 10px 5px #00000026;
            border: 5px solid #e13b3b; text-align: center;
        `;

        // Warning image
        const image = document.createElement("img");
        image.src = "https://i.postimg.cc/1tcqQJtb/stop.png"; // Replace with your image
        image.alt = "Warning Image";
        image.style = "margin-bottom: 15px; width: 100px;";

        // Modal title
        const title = document.createElement("h2");
        title.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shield-lock-fill" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5" style=" fill: #FFC107; " /> </svg> Bloqueador de anuncios detectado <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shield-lock-fill" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5" style=" fill: #FFC107; " /> </svg>';

        // Modal message
        const message = document.createElement("p");
        message.innerText = "Por favor, desactiva tu bloqueador de anuncios y recarga la página.";

        // Button to reload the page
        const reloadButton = document.createElement("button");
        reloadButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/> <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/> </svg>&nbsp;Recargar';
        reloadButton.style = `
            display: flex; background: rgb(233, 68, 68); color: white;
            border: none; padding: 15px 30px; font-size: 16px;
            cursor: pointer; border-radius: 5px; align-items: center;
            margin: 25px auto 0;
        `;
        reloadButton.addEventListener("click", () => location.reload());

        // Add elements to the modal
        modalContent.appendChild(image);
        modalContent.appendChild(title);
        modalContent.appendChild(message);
        modalContent.appendChild(reloadButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    // Delays execution to avoid premature detections
    setTimeout(() => {
        // Creates a bait for ad blockers to detect
        const bait = document.createElement("div");
        bait.id = "ad-detection-bait";
        bait.className = "ad ads advertisement ad-banner adbox ad-container ad-footer ad-header ad-label ad-sidebar ad-space ad-wrapper banner-ad big-ad sponsored-ad pop-up-ad popup promo-ad promoted-content sponsored-content adslot adsense google-ads ad-unit banner-wrapper native-ad video-ad interstitial-ad overlay-ad floating-ad sidebar-ads sticky-ads in-post-ad affiliate-ad ad-content";
        bait.style = "height: 1px; width: 1px; position: absolute; left: -10000px; top: -10000px; background-color: transparent; pointer-events: none;";
        document.body.appendChild(bait);

        // Restores modal styles if an adblock tries to hide it
        function restoreModalStyles(modal) {
            if (modal) {
                modal.style = `
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0, 0, 0, 0.5); color: #242424; font-family: Arial, sans-serif;
                    z-index: 99999; text-align: center; display: flex; align-items: center;
                    justify-content: center; flex-direction: column; backdrop-filter: blur(5px);
                `;
            }
        }

        // Checks if the bait has been blocked and shows the warning
        function checkAdBlock() {
            let bait = document.getElementById("ad-detection-bait");

            // If the bait does not exist or is hidden, it means an ad blocker is active
            if (!bait || bait.offsetHeight === 0 || bait.offsetWidth === 0 || 
                getComputedStyle(bait).display === "none" || 
                getComputedStyle(bait).visibility === "hidden" || 
                getComputedStyle(bait).opacity === "0") {

                createAdblockWarning(); // Displays the warning message

                // Checks if the modal was modified or removed
                setInterval(() => {
                    let modal = document.querySelector("[id^='anti-adblock-']");
                    let bait = document.getElementById("ad-detection-bait");

                    if (!modal || !bait) return;

                    // If the ad blocker is no longer active, stop restoring styles
                    if (bait.offsetHeight > 0 && bait.offsetWidth > 0 && 
                        getComputedStyle(bait).display !== "none" && 
                        getComputedStyle(bait).visibility !== "hidden" && 
                        getComputedStyle(bait).opacity !== "0") {
                        return;
                    }

                    // If the modal was hidden or altered, restore it
                    if (modal && (
                        getComputedStyle(modal).display === "none" || 
                        getComputedStyle(modal).visibility === "hidden" || 
                        getComputedStyle(modal).opacity === "0" || 
                        modal.style.transform === "scale(0)" || 
                        modal.style.height === "0px" || 
                        modal.style.width === "0px"
                    )) {
                        createAdblockWarning();
                    } else {
                        restoreModalStyles(modal);
                    }
                }, 3000);
            }
        }

        // Executes the first detection after a short delay
        setTimeout(checkAdBlock, 100);

        // Repeats detection every 3 seconds to prevent the user from resuming blocking
        setInterval(checkAdBlock, 3000);

        // If the user switches tabs and returns, recheck
        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) {
                setTimeout(checkAdBlock, 500);
            }
        });

    }, 3000);
});
