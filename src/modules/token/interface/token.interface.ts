export interface GeneratedToken {
	token: string
	expires_at: Date
}

export interface TokenPayload {
	sub: string;
}

export type GenerateTokensResponse = [
	accessToken: GeneratedToken,
	refreshToken: GeneratedToken,
];
