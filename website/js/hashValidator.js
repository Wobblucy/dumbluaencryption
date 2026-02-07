const HashValidator = {
    pattern: /^ADDON-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{8}$/i,

    validate: function(hash) {
        if (!hash || typeof hash !== 'string') {
            return { valid: false, error: 'Please enter a license hash.' };
        }

        const normalized = hash.trim().toUpperCase();

        if (normalized.length === 0) {
            return { valid: false, error: 'Please enter a license hash.' };
        }

        if (!this.pattern.test(normalized)) {
            return { valid: false, error: 'Invalid hash format. Expected: ADDON-XXXX-XXXX-XXXX-XXXXXXXX' };
        }

        return { valid: true, normalized: normalized };
    },

    extractSegments: function(hash) {
        const parts = hash.split('-');
        return {
            segment1: parseInt(parts[1], 16),
            segment2: parseInt(parts[2], 16),
            segment3: parseInt(parts[3], 16),
            timestamp: parseInt(parts[4], 16),
            raw: hash
        };
    },

    computeChecksum: function(hash) {
        let sum = 0;
        for (let i = 0; i < hash.length; i++) {
            sum = (sum + hash.charCodeAt(i) * (i + 1)) % 256;
        }
        return sum.toString(16).toUpperCase().padStart(2, '0');
    }
};
