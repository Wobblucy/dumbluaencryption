if not UnitGUID then
    function UnitGUID(unit)
        if unit == "player" then
            return "Player-1234-0ABCDEF1"
        end
        return nil
    end
end

if not GetRealmName then
    function GetRealmName()
        return "Test Realm"
    end
end

if not GetNormalizedRealmName then
    function GetNormalizedRealmName()
        return "testrealm"
    end
end

if not UnitName then
    function UnitName(unit)
        if unit == "player" then
            return "TestCharacter", "Test Realm"
        end
        return nil
    end
end

if not UnitClass then
    function UnitClass(unit)
        if unit == "player" then
            return "Warrior", "WARRIOR", 1
        end
        return nil
    end
end

if not UnitRace then
    function UnitRace(unit)
        if unit == "player" then
            return "Human", "Human", 1
        end
        return nil
    end
end

if not GetSpecialization then
    function GetSpecialization()
        return 1
    end
end

if not GetBuildInfo then
    function GetBuildInfo()
        return "11.0.2", 55959, "Oct 15 2024", 110002, "11.0.2", "Retail"
    end
end

if not GetLocale then
    function GetLocale()
        return "enUS"
    end
end

if not GetCurrentRegion then
    function GetCurrentRegion()
        return 1
    end
end

if not UnitLevel then
    function UnitLevel(unit)
        if unit == "player" then
            return 80
        end
        return 1
    end
end

if not UnitFactionGroup then
    function UnitFactionGroup(unit)
        if unit == "player" then
            return "Alliance", "Alliance"
        end
        return "Neutral", "Neutral"
    end
end

if not time then
    time = os.time
end

if not date then
    date = os.date
end

if not CreateFrame then
    local FrameMethods = {}
    FrameMethods.__index = FrameMethods

    function FrameMethods:SetPoint() end
    function FrameMethods:SetSize() end
    function FrameMethods:SetWidth() end
    function FrameMethods:SetHeight() end
    function FrameMethods:SetBackdrop() end
    function FrameMethods:SetBackdropColor() end
    function FrameMethods:SetBackdropBorderColor() end
    function FrameMethods:EnableMouse() end
    function FrameMethods:SetMovable() end
    function FrameMethods:RegisterForDrag() end
    function FrameMethods:SetScript() end
    function FrameMethods:Show() end
    function FrameMethods:Hide() end
    function FrameMethods:IsShown() return false end
    function FrameMethods:SetText() end
    function FrameMethods:SetFont() end
    function FrameMethods:SetJustifyH() end
    function FrameMethods:SetJustifyV() end
    function FrameMethods:SetTextColor() end
    function FrameMethods:SetAllPoints() end
    function FrameMethods:SetColorTexture() end
    function FrameMethods:CreateFontString()
        return setmetatable({}, FrameMethods)
    end
    function FrameMethods:CreateTexture()
        return setmetatable({}, FrameMethods)
    end
    function FrameMethods:StartMoving() end
    function FrameMethods:StopMovingOrSizing() end

    function CreateFrame(frameType, name, parent, template)
        return setmetatable({}, FrameMethods)
    end

    UIParent = setmetatable({}, FrameMethods)
end

if not SlashCmdList then
    SlashCmdList = {}
end

if not print then
    print = function(...)
        local args = {...}
        for i, v in ipairs(args) do
            io.write(tostring(v))
            if i < #args then io.write("\t") end
        end
        io.write("\n")
    end
end
