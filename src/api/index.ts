/**
 * API 인덱스 모듈
 *
 * @author RWB
 * @since 2025.06.12 Thu 10:52:10
 */

export interface GoogleAuth
{
	/**
	 * access 토큰
	 */
	access_token: string;

	/**
	 * 만료일
	 */
	expires_in: number;

	/**
	 * 스코프
	 */
	scope: string;

	/**
	 * 토큰 종류
	 */
	token_type: string;
}