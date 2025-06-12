import { postGoogleLogin } from '@ga-cachebot/api/auth';
import { PopularPage, postPopularData } from '@ga-cachebot/api/data';
import { writeFileSync } from 'fs';

function mapper(data: PopularPage): string[]
{
	return data?.rows?.map(({ dimensionValues }) => dimensionValues[0].value) ?? [];
}

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

	const clientId = process.argv[2];
	const clientSecret = process.argv[3];
	const refreshToken = process.argv[4];

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
		clientId: clientId,
		clientSecret: clientSecret,
		refreshToken: refreshToken
	});

	if (auth === undefined)
	{
		console.error('❌ Google Login failed.');

		return;
	}

	console.log('👤 Google Login succeed.');

	const postData = await postPopularData('posts', auth);

	if (postData)
	{
		const popularUrl = mapper(postData);

		writeFileSync('posts.json', JSON.stringify(popularUrl), 'utf8');

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

		writeFileSync('projects.json', JSON.stringify(popularUrl), 'utf8');

		console.info('📄 projects.json generated.');
	}

	else
	{
		console.error('❌ posts data fetch failed');

		return;
	}

	console.info('🦙 works done.');
}

main();