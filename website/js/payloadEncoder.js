const PayloadEncoder = {

    encryptPayload: function(source, keyBytes) {
        const sourceBytes = [];
        for (let i = 0; i < source.length; i++) {
            sourceBytes.push(source.charCodeAt(i));
        }

        const encoded = sourceBytes.map((byte, index) => {
            const keyByte = keyBytes[index % keyBytes.length];
            return byte ^ keyByte;
        });

        return encoded;
    },

    formatAsLuaTable: function(encodedBytes, segments) {
        const chunkSize = 64;
        const chunks = [];

        for (let i = 0; i < encodedBytes.length; i += chunkSize) {
            chunks.push(encodedBytes.slice(i, i + chunkSize));
        }

        const order = chunks.map((_, i) => i);
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }

        let lua = '_D={';
        chunks.forEach((chunk, i) => {
            lua += '[' + order[i] + ']={' + chunk.join(',') + '},';
        });
        const luaOrder = order.map((v, i) => '[' + (i + 1) + ']=' + v).join(',');
        lua += '_o={' + luaOrder + '},';
        lua += '_n=' + chunks.length + '}';

        return lua;
    },

    generateDecryptionStub: function(segments, expiryTimestamp) {
        const r = () => '_' + Math.random().toString(36).substr(2, 4);
        const [vE, vK, vD, vX, vC, vB, vR, vP] = [r(), r(), r(), r(), r(), r(), r(), r()];

        return `do
local ${vE}={_g=UnitGUID("player")or"",_t=time()}
local function ${vC}()
if rawget(_G,"DevTools")or rawget(_G,"Spew")then return end
if getmetatable(print)or getmetatable(loadstring)then return end
local _d=debugstack and debugstack()or""
if _d:find("Spy")or _d:find("Hook")or _d:find("Intercept")then return end
return true
end
local function ${vK}()
local _a,_b,_c,_t=${segments.segment1},${segments.segment2},${segments.segment3},${segments.timestamp}
local _k={}local _s=bit.bxor(_a,_b)
for _i=1,16 do _s=bit.band(_s*1103515245+12345,0x7FFFFFFF)_k[_i]=bit.band(_s,0xFF)end
for _i=1,16 do local _h=bit.band(bit.rshift(_c,(_i-1)%16),0xFF)_k[_i]=bit.band(_k[_i]+_h,0xFF)end
local _salt=bit.band(_t,0xFF)
for _i=1,16 do _k[_i]=bit.bxor(_k[_i],_salt+_i-1)end
return _k
end
local function ${vD}(_k)
local ${vB}={}
for _i=1,_D._n do
local _idx=_D._o[_i]
for _,_v in ipairs(_D[_idx]or{})do ${vB}[#${vB}+1]=_v end
end
local ${vR}={}
for _i,_byte in ipairs(${vB})do ${vR}[_i]=string.char(bit.bxor(_byte,_k[(_i-1)%16+1]))end
${vB}=nil
local _src=table.concat(${vR})
${vR}=nil
return _src
end
local function ${vX}()
if ${vE}._t>${segments.timestamp}+900 then return end
if not ${vC}()then return end
if not ${vE}._g or #${vE}._g<10 then return end
local _k=${vK}()
local _src=${vD}(_k)
_k=nil
local ${vP},_e=loadstring(_src)
_src=nil
_D=nil
collectgarbage("collect")
if ${vP} then
local _env=setmetatable({_LOADER=${vE},_SEAL=function()end},{__index=_G,__newindex=_G})
setfenv(${vP},_env)
${vP}()
${vP}=nil
_env._LOADER=nil
end
end
${vX}()
end`;
    }
};
