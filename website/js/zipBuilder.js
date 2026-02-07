const ZipBuilder = {

    addonName: 'LicenseDemo',

    generateTOC: function(hash, expiryDate) {
        return `## Interface: 110207, 120000
## Title: ${this.addonName}
## Notes: Character-bound licensed addon
## Author: License Compiler
## Version: 1.0.0

Data.lua
Core.lua
`;
    },

    generateReadme: function(hash, expiryDate) {
        return `Licensed Addon Package
======================

This module is generated per character.
Redistribution is not supported and may cause undefined behavior.

License Hash: ${hash}
Generated: ${new Date().toISOString().replace('T', ' ').substring(0, 19)}
Expires: ${expiryDate}

Installation:
1. Copy the LicenseDemo folder to your Interface/AddOns directory
2. Reload UI (/reload) or restart the game client

Usage:
- Type /ldemo to toggle the license status display

Note: This is an educational demo demonstrating client-side
licensing concepts. The addon will stop working after 15 minutes.
`;
    },

    createPackage: function(obfuscatedResult) {
        const hash = obfuscatedResult.hash;
        const expiryDate = obfuscatedResult.expiryDate;

        return {
            [`${this.addonName}/${this.addonName}.toc`]: this.generateTOC(hash, expiryDate),
            [`${this.addonName}/Data.lua`]: obfuscatedResult.payloadData,
            [`${this.addonName}/Core.lua`]: obfuscatedResult.decryptionStub,
            [`${this.addonName}/README.txt`]: this.generateReadme(hash, expiryDate)
        };
    },

    downloadFile: function(filename, content) {
        const blob = new Blob([content], { type: 'text/plain; charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    },

    triggerDownload: function(obfuscatedResult) {
        const hash = obfuscatedResult.hash;
        const expiryDate = obfuscatedResult.expiryDate;

        const files = [
            { name: this.addonName + '.toc', content: this.generateTOC(hash, expiryDate) },
            { name: 'Data.lua', content: obfuscatedResult.payloadData },
            { name: 'Core.lua', content: obfuscatedResult.decryptionStub }
        ];

        files.forEach((file, index) => {
            setTimeout(() => {
                this.downloadFile(file.name, file.content);
            }, index * 500);
        });
    }
};
