/**
 * 인덱스 모듈
 *
 * @author RWB
 * @since 2025.06.12 Thu 16:43:42
 */

import {
	mkdirSync,
	writeFileSync
} from 'fs';

import { postGoogleLogin } from '@ga-cachebot/api/auth';
import { postPopularData } from '@ga-cachebot/api/data';

import type { PopularPage } from '@ga-cachebot/api/data';

/**
 * 매퍼 반환 메서드
 *
 * @param {PopularPage} data: PopularPage
 *
 * @returns {string[]} URL
 */
function mapper(data?: PopularPage): string[]
{
	return data?.rows?.map(({ dimensionValues }) => dimensionValues[0].value) ?? [];
}

/**
 * 메인 비동기 메서드
 */
async function main(): Promise<void>
{
	console.log('');
	console.log('==================================');
	console.log(' ╔═╗╔═╗  ╔═╗╔═╗╔═╗╦ ╦╔═╗╔╗ ╔═╗╔╦╗ ');
	console.log(' ║ ╦╠═╣  ║  ╠═╣║  ╠═╣║╣ ╠╩╗║ ║ ║  ');
	console.log(' ╚═╝╩ ╩  ╚═╝╩ ╩╚═╝╩ ╩╚═╝╚═╝╚═╝ ╩  ');
	console.log('==================================');
	console.log('');
	console.log('');

	const clientId = process.argv[2] as string | undefined;
	const clientSecret = process.argv[3] as string | undefined;
	const refreshToken = process.argv[4] as string | undefined;

	if (clientId === undefined)
	{
		console.error('❌ client id is invalid.');

		return;
	}

	else if (clientSecret === undefined)
	{
		console.error('❌ client secret is invalid.');

		return;
	}

	else if (refreshToken === undefined)
	{
		console.error('❌ refresh token is invalid.');

		return;
	}

	const auth = await postGoogleLogin({
		clientId,
		clientSecret,
		refreshToken
	});

	if (auth === undefined)
	{
		console.error('❌ Google Login failed.');

		return;
	}

	console.log('👤 Google Login succeed.');

	mkdirSync('dist');

	const postData = await postPopularData('posts', auth);

	if (postData)
	{
		const popularUrl = mapper(postData);

		writeFileSync('dist/posts.json', JSON.stringify(popularUrl), 'utf8');

		console.info('📄 posts.json generated.');
	}

	else
	{
		console.error('❌ posts data fetch failed');

		return;
	}

	const projectData = await postPopularData('projects', auth);

	if (projectData)
	{
		const popularUrl = mapper(projectData);

		writeFileSync('dist/projects.json', JSON.stringify(popularUrl), 'utf8');

		console.info('📄 projects.json generated.');
	}

	else
	{
		console.error('❌ posts data fetch failed');

		return;
	}

	console.info('🦙 works done.');
}

await main();