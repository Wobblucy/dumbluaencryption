const SymbolEraser = {

    reserved: new Set([
        'and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for',
        'function', 'goto', 'if', 'in', 'local', 'nil', 'not', 'or',
        'repeat', 'return', 'then', 'true', 'until', 'while'
    ]),

    apiPatterns: /^(Unit|Get|Set|Create|Is|Has|C_|Enum|UIParent|print|pairs|ipairs|type|tostring|tonumber|string|table|math|bit|loadstring|pcall|select|unpack|next|rawget|rawset|setmetatable|getmetatable|debug|os|time|date|SLASH_|SlashCmdList|GameFont|OVERLAY|Interface|BackdropTemplate|Frame|Button|CENTER|TOP|BOTTOM|LEFT|RIGHT|TOPLEFT|TOPRIGHT|BOTTOMLEFT|BOTTOMRIGHT|AddonData|Show|Hide|IsShown|Enable|Disable|SetText|SetPoint|SetSize|SetBackdrop|SetBackdropColor|SetBackdropBorderColor|CreateFontString|bgFile|edgeFile|edgeSize|insets|left|right|top|bottom|timer|title|status)/,

    generateName: function(index) {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let name = '';
        let n = index;

        do {
            name = chars[n % 26] + name;
            n = Math.floor(n / 26) - 1;
        } while (n >= 0);

        return '_' + name;
    },

    stripStrings: function(source) {
        return source
            .replace(/"[^"]*"/g, '""')
            .replace(/'[^']*'/g, "''")
            .replace(/\[\[[\s\S]*?\]\]/g, '[[]]');
    },

    extractIdentifiers: function(source) {
        const strippedSource = this.stripStrings(source);
        const identifiers = new Map();

        const funcPattern = /local\s+function\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;
        let match;

        while ((match = funcPattern.exec(strippedSource)) !== null) {
            const name = match[1];

            if (this.reserved.has(name)) continue;
            if (this.apiPatterns.test(name)) continue;
            if (name.startsWith('_')) continue;

            identifiers.set(name, (identifiers.get(name) || 0) + 1);
        }

        return identifiers;
    },

    createMapping: function(identifiers) {
        const mapping = {};
        const names = Array.from(identifiers.keys());

        names.sort(() => Math.random() - 0.5);

        names.forEach((name, index) => {
            mapping[name] = this.generateName(index);
        });

        return mapping;
    },

    applyMapping: function(source, mapping) {
        const parts = [];
        let current = '';
        let inString = false;
        let stringChar = '';
        let inMultiline = false;

        for (let i = 0; i < source.length; i++) {
            const char = source[i];
            const nextChar = i < source.length - 1 ? source[i+1] : '';
            const prevChar = i > 0 ? source[i-1] : '';

            if (!inString && !inMultiline && char === '[' && nextChar === '[') {
                if (current) parts.push({ text: current, isString: false });
                current = '[[';
                inMultiline = true;
                i++;
                continue;
            }

            if (inMultiline && char === ']' && nextChar === ']') {
                current += ']]';
                parts.push({ text: current, isString: true });
                current = '';
                inMultiline = false;
                i++;
                continue;
            }

            if (inMultiline) {
                current += char;
                continue;
            }

            if (!inString && (char === '"' || char === "'")) {
                if (current) parts.push({ text: current, isString: false });
                current = char;
                inString = true;
                stringChar = char;
            } else if (inString && char === stringChar && prevChar !== '\\') {
                current += char;
                parts.push({ text: current, isString: true });
                current = '';
                inString = false;
            } else {
                current += char;
            }
        }
        if (current) parts.push({ text: current, isString: inString || inMultiline });

        for (const part of parts) {
            if (!part.isString) {
                for (const [original, replacement] of Object.entries(mapping)) {
                    const regex = new RegExp('\\b' + original + '\\b', 'g');
                    part.text = part.text.replace(regex, replacement);
                }
            }
        }

        return parts.map(p => p.text).join('');
    },

    decoySnippets: [
        'do local _x = 0 end',
        'do local _y = {} end',
        'do local _z = "" end',
        'local _ = 0'
    ],

    injectDecoys: function(source) {
        const lines = source.split('\n');
        const result = [];

        for (const line of lines) {
            result.push(line);
            const trimmed = line.trim();

            const isSafe = trimmed.endsWith('end') ||
                          trimmed.startsWith('local ') ||
                          trimmed.startsWith('print(');

            if (isSafe && Math.random() < 0.10) {
                const decoy = this.decoySnippets[
                    Math.floor(Math.random() * this.decoySnippets.length)
                ];
                result.push(decoy);
            }
        }

        return result.join('\n');
    },

    eraseSymbols: function(source) {
        const identifiers = this.extractIdentifiers(source);
        const mapping = this.createMapping(identifiers);
        let result = this.applyMapping(source, mapping);
        result = this.injectDecoys(result);
        return result;
    }
};
