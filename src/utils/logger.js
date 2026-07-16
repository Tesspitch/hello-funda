// src/utils/logger.js
export const logger = {
    info: (msg, data = {}) => {
        if (import.meta.env.DEV) {
            console.info(`%c[INFO] ${msg}`, 'color: #3b82f6; font-weight: bold;', data);
        }
        // In the future, send info to analytics backend (e.g. Mixpanel, GA4)
    },
    error: (msg, error = null) => {
        if (import.meta.env.DEV) {
            console.error(`%c[ERROR] ${msg}`, 'color: #ef4444; font-weight: bold;', error);
        }
        // In the future, send error to Sentry or similar service
    },
    warn: (msg, data = {}) => {
        if (import.meta.env.DEV) {
            console.warn(`%c[WARN] ${msg}`, 'color: #f59e0b; font-weight: bold;', data);
        }
    },
    action: (msg, data = {}) => {
        if (import.meta.env.DEV) {
            console.log(`%c[ACTION] ${msg}`, 'color: #10b981; font-weight: bold;', data);
        }
    }
};
