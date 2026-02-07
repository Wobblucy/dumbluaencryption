local addonName = "LicenseDemo"
local mainFrame = nil
local timerText = nil
local expiryTime = EXPIRY_TIME

local function formatTime(seconds)
    if seconds <= 0 then return "EXPIRED" end
    local m = math.floor(seconds / 60)
    local s = seconds % 60
    return string.format("%d:%02d", m, s)
end

local function createDisplay()
    mainFrame = CreateFrame("Frame", addonName .. "_Frame", UIParent, "BackdropTemplate")
    mainFrame:SetSize(320, 90)
    mainFrame:SetPoint("CENTER", UIParent, "CENTER", 0, -120)

    mainFrame:SetBackdrop({
        bgFile = "Interface\\ChatFrame\\ChatFrameBackground",
        edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
        edgeSize = 14,
        insets = { left = 3, right = 3, top = 3, bottom = 3 }
    })
    mainFrame:SetBackdropColor(0.05, 0.35, 0.05, 0.92)
    mainFrame:SetBackdropBorderColor(0.3, 0.8, 0.3, 1)

    local title = mainFrame:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    title:SetPoint("TOP", 0, -12)
    title:SetText("|cff00ff00License Verified|r")

    local status = mainFrame:CreateFontString(nil, "OVERLAY", "GameFontHighlight")
    status:SetPoint("CENTER", 0, -2)
    status:SetText("Addon decrypted and active")

    timerText = mainFrame:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
    timerText:SetPoint("BOTTOM", 0, 12)

    mainFrame:SetScript("OnUpdate", function(self, elapsed)
        local remaining = expiryTime - time()
        if remaining <= 0 then
            timerText:SetText("|cffff0000License EXPIRED|r")
            mainFrame:SetBackdropColor(0.35, 0.05, 0.05, 0.92)
            mainFrame:SetBackdropBorderColor(0.8, 0.3, 0.3, 1)
        elseif remaining <= 60 then
            timerText:SetText("|cffff0000Expires in " .. formatTime(remaining) .. "|r")
        elseif remaining <= 300 then
            timerText:SetText("|cffffcc00Expires in " .. formatTime(remaining) .. "|r")
        else
            timerText:SetText("|cff88ff88Expires in " .. formatTime(remaining) .. "|r")
        end
    end)

    mainFrame:Show()
end

local function initialize()
    createDisplay()

    SLASH_LICENSEDEMO1 = "/ldemo"
    SlashCmdList["LICENSEDEMO"] = function()
        if mainFrame then
            if mainFrame:IsShown() then
                mainFrame:Hide()
            else
                mainFrame:Show()
            end
        end
    end

    print("|cff00ff00[" .. addonName .. "]|r License verified! Expires in " .. formatTime(expiryTime - time()))
    print("|cff00ff00[" .. addonName .. "]|r Type /ldemo to toggle display.")
end

initialize()
