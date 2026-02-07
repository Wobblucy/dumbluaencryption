local isStandalone = (arg ~= nil)

if isStandalone then
    dofile("Mocks/WoWAPI.lua")
    dofile("SignalCollector.lua")
    dofile("HashGenerator.lua")
    dofile("UI.lua")
end

local SignalCollector = LicenseProbe_SignalCollector
local HashGenerator = LicenseProbe_HashGenerator
local UI = LicenseProbe_UI

local currentHash = nil

local function GenerateLicenseHash()
    local signals = SignalCollector.CollectSignals()
    local normalized = SignalCollector.NormalizeSignals(signals)
    currentHash = HashGenerator.GenerateHash(normalized)

    if UI then
        UI.SetHash(currentHash)
        UI.Show()
    end

    if isStandalone then
        print("")
        print("=================================")
        print("  LICENSE HASH")
        print("=================================")
        print("")
        print("  " .. currentHash)
        print("")
        print("  Enter this on the licensing")
        print("  site to receive your addon.")
        print("=================================")
        print("")
        SignalCollector.DebugPrint(signals)
        print("Normalized: " .. normalized)
    else
        print("|cff00ff00License Hash:|r " .. currentHash)
        print("Enter this on the licensing site to receive your addon.")
    end

    return currentHash
end

if not isStandalone and UI then
    UI.Initialize()
end

if not isStandalone then
    SLASH_LICENSEPROBE1 = "/licenseprobe"
    SLASH_LICENSEPROBE2 = "/lprobe"
    SLASH_LICENSEPROBE3 = "/lp"

    SlashCmdList["LICENSEPROBE"] = function(msg)
        if msg == "hide" then
            UI.Hide()
        elseif msg == "toggle" then
            UI.Toggle()
        else
            GenerateLicenseHash()
        end
    end
end

if isStandalone then
    print("License Probe - Standalone Test Mode")
    print("=====================================")
    GenerateLicenseHash()
end
