local ProbeUI = {}

local mainFrame = nil
local hashDisplay = nil
local isInitialized = false

function ProbeUI.Initialize()
    if isInitialized then return end

    mainFrame = CreateFrame("Frame", "LicenseProbeFrame", UIParent, "BackdropTemplate")
    mainFrame:SetSize(420, 140)
    mainFrame:SetPoint("CENTER", UIParent, "CENTER", 0, 100)

    mainFrame:SetBackdrop({
        bgFile = "Interface\\DialogFrame\\UI-DialogBox-Background",
        edgeFile = "Interface\\DialogFrame\\UI-DialogBox-Border",
        edgeSize = 16,
        insets = { left = 4, right = 4, top = 4, bottom = 4 }
    })
    mainFrame:SetBackdropColor(0.05, 0.05, 0.08, 0.95)
    mainFrame:SetBackdropBorderColor(0.4, 0.4, 0.5, 1)

    mainFrame:EnableMouse(true)
    mainFrame:SetMovable(true)
    mainFrame:RegisterForDrag("LeftButton")
    mainFrame:SetScript("OnDragStart", mainFrame.StartMoving)
    mainFrame:SetScript("OnDragStop", mainFrame.StopMovingOrSizing)

    local title = mainFrame:CreateFontString(nil, "OVERLAY", "GameFontNormalLarge")
    title:SetPoint("TOP", mainFrame, "TOP", 0, -16)
    title:SetText("License Probe")
    title:SetTextColor(0.8, 0.8, 0.9, 1)

    hashDisplay = CreateFrame("EditBox", "LicenseProbeHashBox", mainFrame, "InputBoxTemplate")
    hashDisplay:SetSize(380, 30)
    hashDisplay:SetPoint("CENTER", mainFrame, "CENTER", 0, 10)
    hashDisplay:SetFont("Fonts\\FRIZQT__.TTF", 18, "OUTLINE")
    hashDisplay:SetTextColor(0.3, 1, 0.3, 1)
    hashDisplay:SetAutoFocus(false)
    hashDisplay:SetJustifyH("CENTER")
    hashDisplay:SetText("Generating...")
    hashDisplay:SetScript("OnEscapePressed", function(self) self:ClearFocus() end)
    hashDisplay:SetScript("OnEditFocusGained", function(self) self:HighlightText() end)

    local instructions = mainFrame:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    instructions:SetPoint("BOTTOM", mainFrame, "BOTTOM", 0, 20)
    instructions:SetText("Copy this code and enter it on the licensing site.")
    instructions:SetTextColor(0.7, 0.7, 0.7, 1)

    mainFrame:Hide()

    isInitialized = true
end

function ProbeUI.Show()
    if mainFrame then
        mainFrame:Show()
    end
end

function ProbeUI.Hide()
    if mainFrame then
        mainFrame:Hide()
    end
end

function ProbeUI.Toggle()
    if mainFrame then
        if mainFrame:IsShown() then
            mainFrame:Hide()
        else
            mainFrame:Show()
        end
    end
end

function ProbeUI.SetHash(hashValue)
    if hashDisplay then
        hashDisplay:SetText(hashValue)
        hashDisplay:SetTextColor(0.3, 1, 0.3, 1)
        hashDisplay:HighlightText()
        hashDisplay:SetFocus()
    end
end

function ProbeUI.SetError(errorMessage)
    if hashDisplay then
        hashDisplay:SetTextColor(1, 0.3, 0.3, 1)
        hashDisplay:SetText(errorMessage)
        hashDisplay:ClearFocus()
    end
end

LicenseProbe_UI = ProbeUI
