export const validGameName = (gameName) => {
    if (!gameName || typeof gameName !== "string" || gameName.includes("..") || gameName.includes("/") || gameName.includes("\\")) {
        return false
    }
    return true
}

const REQUIRED_OPTION_KEYS = [
    "temperature",
    "top_p",
    "top_k",
    "num_predict",
    "repeat_penalty",
    "repeat_last_n",
    "num_ctx"
];

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

const isFiniteNumber = (value) => typeof value === "number" && Number.isFinite(value);

export const validSettings = (settings) => {
    if (!settings || typeof settings !== "object") {
        return false;
    }

    if (!isNonEmptyString(settings.ollamaModel)) {
        return false;
    }

    if (!isNonEmptyString(settings.summaryModel)) {
        return false;
    }

    if (typeof settings.systemInstructions !== "string") {
        return false;
    }

    if (typeof settings.summaryInstructions !== "string") {
        return false;
    }

    if (!settings.options || typeof settings.options !== "object") {
        return false;
    }

    for (const key of REQUIRED_OPTION_KEYS) {
        if (!isFiniteNumber(settings.options[key])) {
            return false;
        }
    }

    return true;
};