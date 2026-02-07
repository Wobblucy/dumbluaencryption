const TemporalBinder = {

    EXPIRY_SECONDS: 15 * 60,

    getCurrentTimestamp: function() {
        return Math.floor(Date.now() / 1000);
    },

    generateBindingCode: function(expiryTimestamp) {
        return `local _BUILD_EXPIRES = ${expiryTimestamp}
local function _check_temporal()
    if time() > _BUILD_EXPIRES then
        return false
    end
    return true
end
if not _check_temporal() then
    print("|cffff0000[LicenseDemo]|r License expired!")
    return
end
`;
    },

    injectTemporalBinding: function(source, expiryTimestamp) {
        const bindingCode = this.generateBindingCode(expiryTimestamp);
        return bindingCode + source;
    }
};
