import { useContext } from 'react';
import { MusicContext } from '@/components/context/MusicContext.jsx';
import MusicOnIcon from '@/assets/music_note.svg';
import MusicOffIcon from '@/assets/music_off.svg';
import '@/styles/Buttons.css';

export default function MusicToggleButton() {
    const { isPlaying, toggleMusic } = useContext(MusicContext);

	return (
		<div className='music-toggle-container'>
			<button className='pixel-button music-toggle-button' onClick={toggleMusic}>
				<img src={isPlaying ? MusicOnIcon : MusicOffIcon} alt='Toggle music' />
			</button>
		</div>
	);
}
