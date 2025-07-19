import { useState } from 'react';
import '@/styles/Settings.css';
import BackButton from '@/components/Generic/BackButton.jsx';
import Selector from '@/components/Generic/Selector.jsx';

export default function Settings({ initialConfig, onSave }) {
	const [difficulty, setDifficulty] = useState(initialConfig.difficulty);
	const [mode, setMode] = useState(initialConfig.mode);
	const [theme, setTheme] = useState(initialConfig.theme || 'Pokémon');
	const [music, setMusic] = useState(initialConfig.music || 'Off');

	const handleSave = () => {
		onSave({ difficulty, mode, theme, music });
	};

	return (
		<>
			<div className='settings-container'>
				<div className='panel'>
					<BackButton />
					<div className='screen-title'>
						<h1>Settings</h1>
					</div>
				</div>
				<div className='settings'>
					<form className='form-settings'>
						<Selector
							label='Difficulty'
							options={['Easy', 'Medium', 'Hard']}
							value={difficulty}
							onChange={setDifficulty}
						/>

						<Selector
							label='Mode'
							options={['Normal', 'Infinity']}
							value={mode}
							onChange={setMode}
						/>

						<Selector 
							label='Game theme'
							options={['Pokémon', 'Anime', 'Manga', 'Anime & Manga Characters']}
							value={theme}
							onChange={setTheme}
						/>

						<Selector 
							label='Music'
							options={['Off', 'Music 1', 'Music 2', 'Music 3']}
							value={music}
							onChange={setMusic}
						/>

						<button
							type='button'
							className='save-config-button'
							onClick={handleSave}
						>
							Save configuration
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
