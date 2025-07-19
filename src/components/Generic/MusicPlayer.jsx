import { useEffect, useRef } from 'react';

const MUSIC_MAP = {
	'Music 1': '/music/best-game-console-301284.mp3',
	'Music 2': '/music/game-gaming-minecraft-background-music-362844.mp3',
	'Music 3': '/music/gardens-stylish-chill-303261.mp3',
};

export default function MusicPlayer({ music, isPlaying }) {
	const audioRef = useRef(null);

	useEffect(() => {
		if (!music || music === 'Off') {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
			return;
		}

		if (audioRef.current?.src.includes(MUSIC_MAP[music])) {
			return;
		}
		if (audioRef.current) {
			audioRef.current.pause();
		}
		
		const audio = new Audio(MUSIC_MAP[music]);
		audio.loop = true;
		audioRef.current = audio;

		if (isPlaying) {
			audio.play().catch(err => {
				console.warn('Music could not be played:', err);
			});
		}
	}, [music]);

	useEffect(() => {
		if (!audioRef.current) return;
		if (isPlaying) {
			audioRef.current.play().catch(err => {
				console.warn('Music could not be played:', err);
			});
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	return null;
}
