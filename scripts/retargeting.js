/**
 * @file retargeting.js
 * @description Advanced retargeting and cookie injection system for Shree Tanvika Entreprise.
 * This script ensures that user intent is captured and stored via cookies for cross-platform retargeting.
 */

const RETARGETING_CONFIG = {
    cookieName: 'st_retargeting_v1',
    historyLimit: 10,
    cookieExpiryDays: 30,
    debug: true
};

/**
 * Cookie Management Utilities
 */
const CookieManager = {
    set: (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (JSON.stringify(value) || "") + expires + "; path=/; SameSite=Lax";
    },

    get: (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                try {
                    return JSON.parse(c.substring(nameEQ.length, c.length));
                } catch (e) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
        }
        return null;
    }
};

/**
 * Retargeting Logic
 */
const RetargetingScanner = {
    init: function () {
        this.data = CookieManager.get(RETARGETING_CONFIG.cookieName) || {
            views: [],
            lastView: null,
            interactions: 0,
            hasConverted: false,
            timestamp: Date.now()
        };

        if (RETARGETING_CONFIG.debug) {
            console.log("🚀 Retargeting System Initialized", this.data);
        }

        this.syncWithAdNetworks();
    },

    /**
     * Track a product view and inject data into cookies
     * @param {Object} product - The product object being viewed
     */
    trackProductView: function (product) {
        if (!product || !product.id) return;

        const viewEntry = {
            id: product.id,
            name: product.name,
            img: product.mainImage,
            ts: Date.now()
        };

        // Update last view
        this.data.lastView = viewEntry;

        // Add to history if not duplicate
        const exists = this.data.views.find(v => v.id === product.id);
        if (!exists) {
            this.data.views.unshift(viewEntry);
            if (this.data.views.length > RETARGETING_CONFIG.historyLimit) {
                this.data.views.pop();
            }
        } else {
            // Move to top
            this.data.views = [viewEntry, ...this.data.views.filter(v => v.id !== product.id)];
        }

        this.data.interactions++;
        this.save();

        // Signal to Ad Platforms (Placeholders)
        this.signalToAdPlatforms('ViewContent', {
            content_name: product.name,
            content_ids: [product.id],
            content_type: 'product',
            value: product.price ? product.price[0] : 0,
            currency: 'USD'
        });
    },

    /**
     * Track high-intent interaction (WhatsApp click, Inquiry)
     */
    trackLeadIntent: function (type = 'Inquiry') {
        this.data.interactions += 5; // Higher weight
        this.data.hasConverted = true;
        this.save();

        this.signalToAdPlatforms('Contact', {
            method: 'WhatsApp',
            intent: type
        });

        if (RETARGETING_CONFIG.debug) {
            console.log("🔥 High Intent Detected: Lead generated for retargeting.");
        }
    },

    save: function () {
        CookieManager.set(RETARGETING_CONFIG.cookieName, this.data, RETARGETING_CONFIG.cookieExpiryDays);
    },

    /**
     * Integration with Tracking Pixels (Simulated & Real)
     */
    signalToAdPlatforms: function (eventName, params) {
        if (RETARGETING_CONFIG.debug) {
            console.log(`📡 Signaling [${eventName}] to Ad Networks...`, params);
        }

        // Meta (Facebook) Pixel Placeholder
        if (window.fbq) {
            fbq('track', eventName, params);
        }

        // Google Ads Placeholder
        if (window.gtag) {
            gtag('event', 'retargeting_event', {
                'event_label': eventName,
                'items': [{ id: params.content_ids ? params.content_ids[0] : 'n/a', name: params.content_name }]
            });
        }

        // Custom Sale Cookie "Injection"
        // We create a global variable that third party scripts could read
        window._ST_RETARGETING_DATA = this.data;
    },

    syncWithAdNetworks: function () {
        // This function would run on every page load to ensure
        // ad networks see the cookies from previous sessions
        if (this.data.lastView && RETARGETING_CONFIG.debug) {
            console.log(`🎯 Retargeting active for: ${this.data.lastView.name}`);
        }
    }
};

// Initialize on load
RetargetingScanner.init();

// Export to window for access from other scripts
window.Retargeting = RetargetingScanner;
