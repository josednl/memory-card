import './App.css';
import { useState, useContext } from 'react';
import MainMenu from '@/components/Menu/MainMenu.jsx';
import { NavigationContext } from '@/components/context/NavigationContext.jsx';
import GameBoard from '@/components/Gameplay/GameBoard.jsx';
import Settings from './components/GameOptions/Settings';
import MusicToggleButton from '@/components/Generic/MusicToggleButton.jsx';
import { MusicContext } from '@/components/context/MusicContext.jsx';
import MusicPlayer from '@/components/Generic/MusicPlayer.jsx';

function App() {
	const [screen, setScreen] = useState('menu');
	const [config, setConfig] = useState({
		difficulty: 'Medium',
		mode: 'Normal',
		theme: 'Pokémon',
		music: 'Off',
	});

	const { isPlaying } = useContext(MusicContext);

	const goBack = () => setScreen('menu');

	const renderContent = () => {
		switch(screen) {
			case 'game':
				return <GameBoard config={config} />
			case 'settings':
				return <Settings initialConfig={config} onSave={(newConfig) => {
					setConfig(newConfig);
					setScreen('menu');
				}} />
			default:
				return <MainMenu onSelect={setScreen} />
		}
	}

	return (
		<>
			<NavigationContext.Provider value={{ goBack }}>
				<MusicToggleButton />
				<MusicPlayer music={config.music} isPlaying={isPlaying} />
				<div className='content'>
					{renderContent()}
				</div>
			</NavigationContext.Provider>
		</>
	);
}

export default App;
