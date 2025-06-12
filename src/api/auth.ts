/**
 * API 인증 모듈
 *
 * @author RWB
 * @since 2025.06.12 Thu 10:52:25
 */

import { GoogleAuth } from '@ga-cachebot/api';

export interface GoogleAuthRequest
{
	/**
	 * 클라이언트 ID
	 */
	clientId: string;

	/**
	 * 클라이언트 시크릿
	 */
	clientSecret: string;

	/**
	 * Refresh Token
	 */
	refreshToken: string;
}

/**
 * 구글 로그인 결과 반환 API 비동기 메서드
 *
 * @param {GoogleAuthRequest} param0: GoogleAuthRequest
 *
 * @returns {Promise} 비동기 GoogleAuth
 */
export async function postGoogleLogin({ clientId, clientSecret, refreshToken }: GoogleAuthRequest): Promise<GoogleAuth | undefined>
{
	const auth = await fetch('https://accounts.google.com/o/oauth2/token', {
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: 'refresh_token',
			refresh_token: refreshToken
		}),
		method: 'POST'
	});

	// 인증 성공일 경우
	if (auth.ok)
	{
		const json = await auth.json<GoogleAuth>();

		return json;
	}

	return undefined;
}

