export const nameRules = [
    (value: string) => {
        if (value?.length > 3) return true;

        return "Name must be at least 3 characters.";
    },
];

export const emailRules = [
    (value: string) => {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

        return "Must be a valid e-mail.";
    },
];

export const passwordRules = [
    (value: string) => !!value || "Please type password.",
    (value: string) => (value && value.length >= 6) || "minimum 6 characters",
];