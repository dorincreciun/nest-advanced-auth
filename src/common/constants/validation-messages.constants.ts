const AUTH = {
	EMAIL_REQUIRED: 'Adresa de email este obligatorie.',
	EMAIL_INVALID: 'Te rugăm să introduci o adresă de email validă.',
	PASSWORD_REQUIRED: 'Parola este obligatorie.',
	PASSWORD_IS_STRING: 'Parola trebuie să fie un șir de caractere.',
	PASSWORD_MIN_LENGTH: 'Parola trebuie să aibă cel puțin 8 caractere.',
	PASSWORD_TOO_WEAK:
		'Parola este prea slabă. Trebuie să conțină o literă mare, o literă mică și un număr.',
} as const;

const USER = {
	CONFIRMATION_CODE_REQUIRED: 'Codul de activare este obligatorie.',
	CONFIRMATION_CODE_IS_STRING: 'Codul trebuie să fie un șir de caractere.',
	CONFIRMATION_CODE_LENGTH:
		'Codul de activare trebuie să aibă exact 6 cifre.',
	CONFIRMATION_CODE_DIGITS: 'Codul trebuie să conțină doar cifre.',
} as const;

export const VAL_MESSAGES = Object.freeze({
	USER,
	AUTH,
} as const);

export type ValidationMessages = typeof VAL_MESSAGES;
