import { useState } from 'react';
import { MusicContext } from '@/components/context/MusicContext.jsx';

export function MusicProvider({ children }) {
	const [isPlaying, setIsPlaying] = useState(false);

	const toggleMusic = () => setIsPlaying(prev => !prev);

	return (
		<MusicContext.Provider value={{ isPlaying, toggleMusic }}>
			{children}
		</MusicContext.Provider>
	);
}
