local SignalCollector = {}

function SignalCollector.CollectSignals()
    local signals = {}

    signals.guid = UnitGUID("player") or "UNKNOWN-GUID"

    signals.realmDisplay = GetRealmName() or "UnknownRealm"
    signals.realmNormalized = GetNormalizedRealmName() or "unknownrealm"

    local charName, charRealm = UnitName("player")
    signals.characterName = charName or "UnknownChar"

    signals.level = UnitLevel("player") or 1

    local className, classToken, classId = UnitClass("player")
    signals.classToken = classToken or "UNKNOWN"
    signals.classId = classId or 0

    local raceName, raceToken, raceId = UnitRace("player")
    signals.raceToken = raceToken or "UNKNOWN"
    signals.raceId = raceId or 0

    local faction = UnitFactionGroup("player") or "Neutral"
    signals.faction = faction

    local specIndex = GetSpecialization and GetSpecialization() or 0
    signals.specIndex = specIndex

    local version, build, buildDate, tocVersion = GetBuildInfo()
    signals.clientVersion = version or "0.0.0"
    signals.buildNumber = build or 0
    signals.tocVersion = tocVersion or 0

    signals.locale = GetLocale() or "enUS"
    signals.region = GetCurrentRegion() or 1

    signals.probeSalt = "LICENSEPROBE-V2"

    return signals
end

function SignalCollector.NormalizeSignals(signals)
    local components = {
        signals.guid,
        signals.realmNormalized,
        signals.characterName,
        tostring(signals.level),
        signals.classToken,
        tostring(signals.classId),
        signals.raceToken,
        tostring(signals.raceId),
        signals.faction,
        tostring(signals.specIndex),
        signals.clientVersion,
        tostring(signals.buildNumber),
        signals.locale,
        tostring(signals.region),
        signals.probeSalt
    }

    local combined = table.concat(components, "|")
    local normalized = combined:lower():gsub("%s+", "")

    return normalized
end

function SignalCollector.DebugPrint(signals)
    print("=== Collected Signals ===")
    print("GUID: " .. signals.guid)
    print("Realm: " .. signals.realmDisplay .. " (" .. signals.realmNormalized .. ")")
    print("Character: " .. signals.characterName .. " (Level " .. signals.level .. ")")
    print("Class: " .. signals.classToken .. " (ID: " .. signals.classId .. ")")
    print("Race: " .. signals.raceToken .. " (ID: " .. signals.raceId .. ")")
    print("Faction: " .. signals.faction)
    print("Spec: " .. signals.specIndex)
    print("Build: " .. signals.clientVersion .. " (" .. signals.buildNumber .. ")")
    print("Locale: " .. signals.locale .. ", Region: " .. signals.region)
    print("========================")
end

LicenseProbe_SignalCollector = SignalCollector
