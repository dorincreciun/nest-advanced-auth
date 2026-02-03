const DATABASE = {
	QUERY_ERROR: 'A intervenit o eroare la procesarea datelor în baza de date.',
	NOT_FOUND: 'Resursa solicitată nu a fost găsită în baza de date.',
} as const;

const AUTH = {
	UNAUTHORIZED: 'You are not allowed to perform this action',
	EMAIL_ALREADY_EXISTS: 'Adresa de email este deja utilizată de un alt cont.',
} as const;

const SERVER = {
	INTERNAL_ERROR: 'A intervenit o eroare internă la nivelul serverului.',
} as const;

export const EX_MESSAGES = Object.freeze({
	DATABASE,
	AUTH,
	SERVER,
} as const);