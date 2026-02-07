const ControlFlowFlattener = {

    generateHandlerName: function() {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let name = '_h';
        for (let i = 0; i < 4; i++) {
            name += chars[Math.floor(Math.random() * chars.length)];
        }
        return name;
    },

    flatten: function(luaSource) {
        const handlerName = this.generateHandlerName();
        const tableName = '_t' + Math.floor(Math.random() * 900 + 100);
        const keyVal = Math.floor(Math.random() * 900 + 100);

        let code = 'local ' + tableName + ' = {}\n';
        code += tableName + '[' + keyVal + '] = function()\n';

        const indented = luaSource.split('\n')
            .map(line => '    ' + line)
            .join('\n');
        code += indented + '\n';

        code += 'end\n\n';
        code += 'local ' + handlerName + ' = ' + tableName + '[' + keyVal + ']\n';
        code += 'if ' + handlerName + ' then ' + handlerName + '() end\n';

        return code;
    }
};
