const IntegrityTrapper = {

    computeChecksum: function(code) {
        let sum = 0;
        for (let i = 0; i < code.length; i++) {
            sum = (sum + code.charCodeAt(i) * (i + 1)) % 0xFFFFFFFF;
        }
        return sum >>> 0;
    },

    injectIntegrityChecks: function(source) {
        const checksum = this.computeChecksum(source);

        const header = `local _INTEGRITY_SIG = ${checksum}
local _integrity_ok = true
local function _verify_sig()
    if _INTEGRITY_SIG == 0 then
        _integrity_ok = false
    end
    return _integrity_ok
end
_verify_sig()
`;
        return header + source;
    }
};
