// Aggressive Anti-AdBlock
document.addEventListener("DOMContentLoaded", function () {
    const AdBlockGuard = {
        /**
         * Configuration Constants
         * Defines CSS classes, IDs, styles, and timing intervals.
         */
        config: {
            checkInterval: 2000, 
            ids: {
                baitGeneric: 'ad-detection-bait', // Generic bait ID
                baitAdsense: 'ad-detection-bait-ins', // Unique ID for our specific AdSense bait
                modalPrefix: 'anti-adblock-', // Prefix for modal IDs
                watchedAdContainers: [] // OPTIONAL: User-defined IDs of legitimate ad containers to monitor. E.g. ['ad-header', 'ad-sidebar', 'ad-bottom']
            },
            classes: {
                // A mix of common ad-related classes to trigger generic blockers
                baitGeneric: "ad-banner adsbygoogle ad-unit advertisement adbox sponsored-ad",
                baitAdsense: "adsbygoogle",
                baitAdsensePermittedPrefix: "adsbygoogle-"
            },
            styles: {
                // Inline styles with !important to prevent external CSS overriding
                bait: "display: block !important; visibility: visible !important; opacity: 1 !important; height: 1px !important; width: 1px !important; position: absolute !important; left: -10000px !important; top: -10000px !important; background-color: transparent !important; pointer-events: none !important;",
                modalWrapper: `
                    position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important;
                    height: 100% !important; background: rgba(0, 0, 0, 0.5) !important;
                    color: #242424 !important; font-family: Arial, sans-serif !important;
                    z-index: 99999 !important; display: flex !important; align-items: center !important;
                    justify-content: center !important; flex-direction: column !important;
                    backdrop-filter: blur(5px) !important;
                `,
                modalContent: `
                    max-width: 600px !important; width: 90% !important; padding: 20px !important; background: white !important;
                    border-radius: 15px !important; box-shadow: 0 0 10px 5px #00000026 !important;
                    border: 5px solid #e13b3b !important; text-align: center !important;
                `
            }
        },

        state: {
            warningActive: false,
            elements: {
                baitGeneric: null,
                baitAdsense: null
            }
        },

        init() {
            // Kickstart the detection process
            this.runInitialChecks();
            this.startLoop();
            this.bindEvents();
            this.startIframeMonitor();
        },

        // --- DOM Management ---

        /**
         * Creates or retrieves the 'bait' elements.
         * These are invisible elements with ad-like classes designed to be hidden by blockers.
         */
        createBaits() {
            // 1. Generic Bait (Standard ad classes)
            this.state.elements.baitGeneric = document.getElementById(this.config.ids.baitGeneric);
            if (!this.state.elements.baitGeneric) {
                this.state.elements.baitGeneric = document.createElement("div");
                this.state.elements.baitGeneric.id = this.config.ids.baitGeneric;
                this.state.elements.baitGeneric.className = this.config.classes.baitGeneric;
                this.state.elements.baitGeneric.style = this.config.styles.bait;
                document.body.appendChild(this.state.elements.baitGeneric);
            }

            // 2. AdSense Bait (Mimics an AdSense <ins> tag)
            // Uses a specific ID to avoid confusing legitimate ads on the page
            this.state.elements.baitAdsense = document.getElementById(this.config.ids.baitAdsense);
            if (!this.state.elements.baitAdsense) {
                this.state.elements.baitAdsense = document.createElement("ins");
                this.state.elements.baitAdsense.id = this.config.ids.baitAdsense; 
                this.state.elements.baitAdsense.className = this.config.classes.baitAdsense;
                this.state.elements.baitAdsense.style = this.config.styles.bait;
                document.body.appendChild(this.state.elements.baitAdsense);
            }
        },

        /**
         * Refreshes baits by moving them in the DOM.
         * This forces the browser (and extensions) to re-evaluate CSS rules,
         * catching blockers that might have missed the initial load or are in a dormant state.
         */
        refreshBaits() {
            if (this.state.warningActive) return;

            ['baitGeneric', 'baitAdsense'].forEach(key => {
                const el = this.state.elements[key];
                if (el && el.isConnected) {
                    // Re-appending an existing node moves it to the end, triggering a style recalc
                    document.body.appendChild(el); 
                } else {
                    this.createBaits(); // Re-create if missing
                }
            });
        },

        // --- UI (Warning Modal) ---
        generateUniqueId() {
            // Random ID to prevent static CSS rules from hiding the modal
            return this.config.ids.modalPrefix + Math.random().toString(36).substr(2, 9);
        },

        createWarningModal() {
            if (this.state.warningActive) return; 

            // Check if a modal already exists (even if tracked state says otherwise)
            let existingModal = document.querySelector(`[id^='${this.config.ids.modalPrefix}']`);
            if (existingModal) {
                this.restoreModalStyles(existingModal);
                this.state.warningActive = true;
                return;
            }

            // Create new modal
            const modalId = this.generateUniqueId();
            const modal = document.createElement("div");
            modal.id = modalId;
            modal.style = this.config.styles.modalWrapper;

            const modalContent = document.createElement("div");
            modalContent.style = this.config.styles.modalContent;

            // Content Construction
            const image = document.createElement("img");
            image.src = "https://i.postimg.cc/1tcqQJtb/stop.png";
            image.alt = "Warning Image";
            image.style = "margin-bottom: 15px; width: 100px;";

            const title = document.createElement("h2");
            title.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shield-lock-fill" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5" style=" fill: #FFC107; " /> </svg> Bloqueador de anuncios detectado <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shield-lock-fill" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5" style=" fill: #FFC107; " /> </svg>';
            
            const message = document.createElement("p");
            message.innerHTML = "Por favor, desactiva tu bloqueador de anuncios y recarga la p&aacute;gina.";

            const reloadButton = document.createElement("button");
            reloadButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/> <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/> </svg>&nbsp;Recargar';
            reloadButton.style = `
                display: flex; background: rgb(233, 68, 68); color: white;
                border: none; padding: 15px 30px; font-size: 16px;
                cursor: pointer; border-radius: 5px; align-items: center;
                margin: 25px auto 0;
            `;
            reloadButton.addEventListener("click", () => location.reload());

            modalContent.appendChild(image);
            modalContent.appendChild(title);
            modalContent.appendChild(message);
            modalContent.appendChild(reloadButton);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            this.state.warningActive = true;
        },

        restoreModalStyles(modal) {
            /**
             * Aggressive Persistence Mechanism.
             * Executed every check cycle to ensure the modal cannot be hidden or tampered with.
             */
            
            // 1. Rotate ID: Prevents users from writing static CSS
            modal.id = this.generateUniqueId();
            
            // 2. Force Styles: Overwrites 'style' attribute with the secure config string.
            // This undoes any manual tampering via Inspector (opacity, visibility, z-index).
            modal.style.cssText = this.config.styles.modalWrapper;
            
            // 3. Clip-Path Protection: Ensures the modal isn't hidden via clipping.
            modal.style.clipPath = "none";
        },

        // --- Detection Logic ---
        isBlocked(element) {
            if (!element) return true;
            if (element.offsetHeight === 0 || element.offsetWidth === 0) return true;
            const style = getComputedStyle(element);
            return style.display === "none" || style.visibility === "hidden" || style.opacity === "0";
        },

        checkState() {
            // 1. If Warning is Active: Enforce Persistence
            if (this.state.warningActive) {
                const modal = document.querySelector(`[id^='${this.config.ids.modalPrefix}']`);
                if (modal) {
                    this.restoreModalStyles(modal);
                } else {
                    // Modal was deleted from DOM. Recreate immediately.
                    this.state.warningActive = false; 
                    this.createWarningModal();
                }
                return; // Stop checks, we are already blocking.
            }

            // 2. Ensure Baits are present
            this.createBaits();

            let detected = false;
            
            // Check Method A: Generic Bait Visibility
            if (this.isBlocked(this.state.elements.baitGeneric)) {
                detected = true;
            }

            // Check Method B: AdSense Manipulation (Scanning ALL ads)
            // Some blockers add classes or titles to <ins> elements instead of hiding them.
            const allAdElements = document.querySelectorAll(`ins.${this.config.classes.baitAdsense}`);
            for (const ad of allAdElements) {
                const classNames = Array.from(ad.classList);
                // Detect unauthorized classes (anything not "adsbygoogle" or "adsbygoogle-xxx")
                const hasSuspiciousClass = classNames.some(cls => 
                    cls !== this.config.classes.baitAdsense && 
                    !cls.startsWith(this.config.classes.baitAdsensePermittedPrefix)
                );
                
                if (hasSuspiciousClass || ad.hasAttribute("title")) {
                    detected = true;
                    break;
                }
            }

            // Check Method C: User-defined Ad Containers
            // Checks if specific containers defined by the user are hidden or removed
            if (this.config.ids.watchedAdContainers && Array.isArray(this.config.ids.watchedAdContainers)) {
                for (const containerId of this.config.ids.watchedAdContainers) {
                    const el = document.getElementById(containerId);
                    // Trigger detection if element is missing (removed) or hidden
                    if (!el || this.isBlocked(el)) {
                        detected = true;
                        break;
                    }
                }
            }

            if (detected) {
                this.createWarningModal();
            }
        },

        // --- Main Loop & Events ---

        runInitialChecks() {
            this.checkState();
            // A burst of checks to catch race conditions during page load
            [100, 500, 1000, 2000].forEach(delay => 
                setTimeout(() => this.checkState(), delay)
            );
        },

        startLoop() {
            let cycles = 0;
            const AGGRESSIVE_LIMIT = 30; // Limit aggressive refresh to first ~60 seconds (30 * 2000ms)

            setInterval(() => {
                this.checkState();
                
                // COOL-DOWN MECHANISM:
                // Only refresh baits aggressively for the first phase.
                // Afterward, rely on passive monitoring (checkState) to save client CPU.
                if (!this.state.warningActive && cycles < AGGRESSIVE_LIMIT) {
                    this.refreshBaits();
                    cycles++;
                }
            }, this.config.checkInterval);

            // Reactivate aggressive monitoring if user returns to the tab
            document.addEventListener("visibilitychange", () => {
                if (!document.hidden) {
                    this.checkState();
                    cycles = 0; // Reset counter
                }
            });
        },

        bindEvents() {
            // BFCache support (Back/Forward navigation)
            window.addEventListener('pageshow', (event) => {
                if (event.persisted) this.checkState();
            });
            window.addEventListener('load', () => {
                setTimeout(() => this.checkState(), 100);
            });
        },

        /**
         * Iframe Monitor (MutationObserver)
         * Watches for changes in iframes injected by ad networks.
         * Detects forced dimensions (1px !important) often triggered by cosmetic filters.
         */
        startIframeMonitor() {
            const RULES = [
                /height\s*:\s*1px\s*!important/i,
                /width\s*:\s*1px\s*!important/i,
                /max-height\s*:\s*1px\s*!important/i,
                /max-width\s*:\s*1px\s*!important/i
            ];
            
            let iframeDetected = false;

            const check = () => {
                if (iframeDetected) return;
                const iframes = document.querySelectorAll('ins iframe[id^="aswift_"]');
                for (const iframe of iframes) {
                    const style = iframe.getAttribute('style');
                    if (!style) continue;
                    
                    let count = 0;
                    for (const r of RULES) {
                        if (r.test(style)) count++;
                    }
                    if (count >= 2) {
                        iframeDetected = true;
                        this.createWarningModal();
                        try { observer.disconnect(); } catch (e) {}
                        break;
                    }
                }
            };

            const observer = new MutationObserver((mutations) => {
                let shouldCheck = false;
                for (const m of mutations) {
                    if (m.type === 'childList') shouldCheck = true;
                    else if (m.type === 'attributes' && (m.target.tagName === 'IFRAME' || m.target.tagName === 'INS')) shouldCheck = true;
                }
                if (shouldCheck) check();
            });

            observer.observe(document.documentElement, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style']
            });

            setInterval(check, 3500); // Auxiliary polling for iframes
        }
    };

    AdBlockGuard.init();
});