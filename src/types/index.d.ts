/**
 * 타입 모듈
 *
 * @author RWB
 * @since 2025.06.12 Thu 10:51:57
 */

interface Response
{
	/**
	 * JSON
	 */
	json: <T>() => Promise<T>;
}