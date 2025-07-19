function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function isContentSafe(item) {
	const unsafeRatings = ['Rx'];
	const unsafeGenres = ['Hentai'];

	const hasUnsafeRating = item.rating && unsafeRatings.includes(item.rating);
	const hasUnsafeGenre =
		Array.isArray(item.genres) &&
		item.genres.some((g) =>
			unsafeGenres.some((u) =>
				g.name.toLowerCase().includes(u.toLowerCase())
			)
		);
	const hasUnsafeTheme =
		Array.isArray(item.themes) &&
		item.themes.some((t) =>
			unsafeGenres.some((u) =>
				t.name.toLowerCase().includes(u.toLowerCase())
			)
		);

	return !(hasUnsafeRating || hasUnsafeGenre || hasUnsafeTheme);
}

function toCardFormat(character) {
	return {
		id: character.mal_id,
		name: character.name,
		imageUrl: character.images.jpg.image_url,
	};
}

function toAnimeCardFormat(anime) {
	return {
		id: anime.mal_id,
		name: anime.title,
		imageUrl: anime.images?.jpg?.image_url ?? '',
	};
}

function toMangaCardFormat(manga) {
	return {
		id: manga.mal_id,
		name: manga.title,
		imageUrl: manga.images?.jpg?.image_url ?? '',
	};
}

function isValidCharacter(character) {
	return (
		character?.images?.jpg?.image_url &&
		character?.name &&
		character.name.length > 1
	);
}

function shuffleArray(array) {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

function removeDuplicatesById(array) {
	return array.filter(
		(item, index, self) =>
			index === self.findIndex((i) => i.mal_id === item.mal_id)
	);
}

// ==== API Functions ====

const API_BASE = 'https://api.jikan.moe/v4';
const DELAY_MS = 500;
const MAX_PER_PAGE = 25;

// --- Core fetch logic ---
async function fetchPage(endpoint, page = 1, limit = 25, retries = 3) {
	await delay(1000);

	const url = `${API_BASE}/${endpoint}?page=${page}&limit=${limit}`;

	try {
		const res = await fetch(url);

		if (res.status === 429) {
			if (retries <= 0)
				throw new Error('Too many requests (429), retries exhausted.');
			console.warn(`Rate limited on ${url}, retrying...`);
			await delay(2000);
			return fetchPage(endpoint, page, limit, retries - 1);
		}

		if (!res.ok) {
			throw new Error(`HTTP ${res.status}`);
		}

		const data = await res.json();
		return data?.data || [];
	} catch (err) {
		console.error('Error fetching characters:', err.message);
		return [];
	}
}

// --- Anime ---
export async function getRandomAnimes(count) {
	let results = [];
	const usedPages = new Set();

	while (results.length < count && usedPages.size < 10) {
		const page = Math.floor(Math.random() * 1000) + 1;
		if (usedPages.has(page)) continue;
		usedPages.add(page);

		try {
			const animes = await fetchPage('anime', page);
			const filtered = animes.filter(isContentSafe);
			results.push(...filtered);
		} catch (e) {
			console.error(`Anime page ${page} failed:`, e);
		}
	}

	const unique = removeDuplicatesById(results);
	const shuffled = shuffleArray(unique);
	return shuffled.slice(0, count).map(toAnimeCardFormat);
}

// --- Manga ---
export async function getRandomMangas(count) {
	let results = [];
	const usedPages = new Set();

	while (results.length < count && usedPages.size < 10) {
		const page = Math.floor(Math.random() * 1000) + 1;
		if (usedPages.has(page)) continue;
		usedPages.add(page);

		try {
			const mangas = await fetchPage('manga', page);
			const filtered = mangas.filter(isContentSafe);
			results.push(...filtered);
		} catch (e) {
			console.error(`Manga page ${page} failed:`, e);
		}
	}

	const unique = removeDuplicatesById(results);
	const shuffled = shuffleArray(unique);
	return shuffled.slice(0, count).map(toMangaCardFormat);
}

// --- Popular Characters ---
export async function getPopularCharacters(count, type = 'all') {
	let results = [];
	let currentPage = 1;

	while (results.length < count && currentPage <= 20) {
		try {
			const chars = await fetchPage('characters', currentPage);
			const filtered = chars.filter((c) => isValidCharacter(c, type));
			results.push(...filtered);
		} catch (e) {
			console.error(`Popular chars page ${currentPage} failed:`, e);
		}
		currentPage++;
	}

	const unique = removeDuplicatesById(results);
	const shuffled = shuffleArray(unique);
	return shuffled.slice(0, count).map(toCardFormat);
}

let cachedCharacters = null;

export async function getAnimeAndMangaCharacters(count) {
	if (cachedCharacters?.length >= count) {
		return shuffleArray(cachedCharacters).slice(0, count).map(toCardFormat);
	}

	const page = Math.floor(Math.random() * 100) + 1;
	const characters = await fetchPage('characters', page);

	const valid = characters.filter((c) => isValidCharacter(c, 'all'));
	cachedCharacters = valid;

	return shuffleArray(valid).slice(0, count).map(toCardFormat);
}

// --- Random Characters ---
export async function getRandomCharacters(count, type = 'all') {
	let results = [];
	const usedPages = new Set();

	const getRandomPage = () => {
		if (type === 'anime') return Math.floor(Math.random() * 500) + 1;
		if (type === 'manga') return Math.floor(Math.random() * 300) + 1;
		return Math.floor(Math.random() * 800) + 1;
	};

	while (results.length < count && usedPages.size < 15) {
		const page = getRandomPage();
		if (usedPages.has(page)) continue;
		usedPages.add(page);

		try {
			const chars = await fetchPage('characters', page);
			const filtered = chars.filter((c) => isValidCharacter(c, type));
			results.push(...filtered);
		} catch (e) {
			console.error(`Random char page ${page} failed:`, e);
		}
	}

	if (results.length < count) {
		const needed = count - results.length;
		const popular = await getPopularCharacters(needed, type);
		results.push(...popular);
	}

	const unique = removeDuplicatesById(results);
	const shuffled = shuffleArray(unique);
	return shuffled.slice(0, count).map(toCardFormat);
}

export async function getRandomMixedCharacters(count = 20) {
	const totalPages = 100;

	const popularPage = 1;
	const randomPage = Math.floor(Math.random() * (totalPages - 2)) + 2;

	const [popularChars, randomChars] = await Promise.all([
		fetchPage('characters', popularPage),
		fetchPage('characters', randomPage),
	]);

	const combined = [...popularChars, ...randomChars];

	const validCharacters = combined.filter((c) => isValidCharacter(c, 'all'));

	return shuffleArray(validCharacters).slice(0, count).map(toCardFormat);
}
