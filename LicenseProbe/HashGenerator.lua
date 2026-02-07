local HashGenerator = {}

local function computeRollingHash(inputString)
    local h1 = 5381
    local h2 = 52711

    for i = 1, #inputString do
        local byte = inputString:byte(i)
        h1 = ((h1 * 33) + byte) % 0xFFFFFFFF
        h2 = ((h2 * 31) + byte) % 0xFFFFFFFF
    end

    local mixed = ((h1 * 31) + h2) % 0xFFFFFFFF

    return h1, h2, mixed
end

local function formatHashOutput(h1, h2, timestamp)
    local seg1 = math.floor(h1 % 0x10000)
    local seg2 = math.floor(h2 % 0x10000)
    local seg3 = math.floor((h1 / 0x10000) % 0x10000)

    return string.format("ADDON-%04X-%04X-%04X-%08X", seg1, seg2, seg3, timestamp)
end

function HashGenerator.GenerateHash(normalizedString)
    local h1, h2, mixed = computeRollingHash(normalizedString)
    local timestamp = time()
    return formatHashOutput(h1, h2, timestamp)
end

function HashGenerator.ComputeChecksum(hashString)
    local sum = 0
    for i = 1, #hashString do
        sum = (sum + hashString:byte(i) * i) % 256
    end
    return string.format("%02X", sum)
end

function HashGenerator.ParseHash(hashString)
    local pattern = "ADDON%-(%x+)%-(%x+)%-(%x+)%-(%x+)"
    local s1, s2, s3, s4 = hashString:match(pattern)

    if s1 and s2 and s3 and s4 then
        return {
            segment1 = tonumber(s1, 16),
            segment2 = tonumber(s2, 16),
            segment3 = tonumber(s3, 16),
            segment4 = tonumber(s4, 16)
        }
    end

    return nil
end

LicenseProbe_HashGenerator = HashGenerator
