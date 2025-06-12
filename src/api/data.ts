/**
 * API 데이터 모듈
 *
 * @author RWB
 * @since 2025.06.12 Thu 10:52:41
 */

import type { GoogleAuth } from '@ga-cachebot/api';

export type DataType = 'posts' | 'projects';

export interface DimensionHeader
{
	/**
	 * 이름
	 */
	name: string;
}

export interface MetricHeader
{
	/**
	 * 이름
	 */
	name: string;

	/**
	 * 타입
	 */
	type: string;
}

export interface PopularPageValue
{
	/**
	 * 값
	 */
	value: string;
}

export interface PopularPageObject
{
	/**
	 * 디멘션 값
	 */
	dimensionValues: PopularPageValue[];

	/**
	 * 메트릭 값
	 */
	metricValues: PopularPageValue[];
}

export interface PopularMetadata
{
	/**
	 * 코드
	 */
	currencyCode: string;

	/**
	 * 타임존
	 */
	timeZone: string;
}

export interface PopularPage
{
	/**
	 * 디멘션 헤더
	 */
	dimensionHeaders?: DimensionHeader[];

	/**
	 * 메트릭 헤더
	 */
	metricHeaders?: MetricHeader[];

	/**
	 * 데이터
	 */
	rows?: PopularPageObject[];

	/**
	 * 전체
	 */
	totals?: PopularPageObject;

	/**
	 * 데이터 갯수
	 */
	rowCount?: number;

	/**
	 * 메타데이터
	 */
	metadata?: PopularMetadata;

	/**
	 * 종류
	 */
	kind: string;
}

/**
 * 인기 컨텐츠 목록 반환 API 비동기 메서드
 *
 * @param {DataType} type: 컨텐츠 타입
 * @param {GoogleAuth} auth: GoogleAuth
 *
 * @returns {PopularPage} 비동기 인기 컨텐츠 목록
 */
export async function postPopularData(type: DataType, auth: GoogleAuth): Promise<PopularPage | undefined>
{
	const list = await fetch('https://content-analyticsdata.googleapis.com/v1beta/properties/284521573:runReport?alt=json', {
		body: JSON.stringify({
			dateRanges: [ {
				endDate: 'today',
				startDate: '30daysAgo'
			} ],
			dimensionFilter: {
				filter: {
					fieldName: 'pagePath',
					stringFilter: {
						matchType: 'BEGINS_WITH',
						value: `/${type}/2`
					}
				}
			},
			dimensions: [ { name: 'pagePath' } ],
			limit: 6,
			metricAggregations: [ 'TOTAL' ],
			metrics: [ { name: 'active28DayUsers' } ]
		}),
		headers: { Authorization: `${auth.token_type} ${auth.access_token}` },
		method: 'POST'
	});

	// 인증 성공일 경우
	if (list.ok)
	{
		const json = await list.json<PopularPage>();

		return json;
	}

	return undefined;
}