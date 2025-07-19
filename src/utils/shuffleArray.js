export function shuffleArray(array) {
	return array
		.map((item) => ({ item, sortKey: Math.random() }))
		.sort((a, b) => a.sortKey - b.sortKey)
		.map(({ item }) => item);
}
