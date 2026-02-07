const KeyDeriver = {

    lcgNext: function(state) {
        return ((state * 1103515245 + 12345) & 0x7FFFFFFF);
    },

    deriveKeyA: function(segments) {
        const seed = (segments.segment1 ^ segments.segment2) >>> 0;
        const keyA = [];
        let state = seed;

        for (let i = 0; i < 16; i++) {
            state = this.lcgNext(state);
            keyA.push(state & 0xFF);
        }

        return keyA;
    },

    deriveKeyB: function(keyA, segments) {
        const modifier = segments.segment3;
        const keyB = keyA.map((byte, index) => {
            const shift = (modifier >>> (index % 16)) & 0xFF;
            return (byte + shift) & 0xFF;
        });

        return keyB;
    },

    deriveKeyC: function(keyB, segments) {
        const timestamp = segments.timestamp;
        const salt = (timestamp & 0xFF);

        const keyC = keyB.map((byte, index) => {
            return (byte ^ (salt + index)) & 0xFF;
        });

        return keyC;
    },

    deriveAllKeys: function(hash) {
        const segments = HashValidator.extractSegments(hash);

        const keyA = this.deriveKeyA(segments);
        const keyB = this.deriveKeyB(keyA, segments);
        const keyC = this.deriveKeyC(keyB, segments);

        const expiryTimestamp = segments.timestamp + (15 * 60);
        const expiryDate = new Date(expiryTimestamp * 1000);

        return {
            segments: segments,
            keyA: keyA,
            keyB: keyB,
            keyC: keyC,
            hashTimestamp: segments.timestamp,
            expiryTimestamp: expiryTimestamp,
            expiryDate: expiryDate.toISOString().replace('T', ' ').substring(0, 19)
        };
    },

    keyToHex: function(keyBytes) {
        return keyBytes.map(b => b.toString(16).padStart(2, '0')).join('');
    }
};
