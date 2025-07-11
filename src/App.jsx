import './App.css';
import { useState } from 'react';
import MainMenu from '@/components/Menu/MainMenu.jsx';
import { NavigationContext } from '@/components/context/NavigationContext.jsx';
import GameBoard from '@/components/Gameplay/GameBoard.jsx';
import Settings from './components/GameOptions/Settings';

function App() {
	const [screen, setScreen] = useState('menu');
	const [config, setConfig] = useState({
		difficulty: 'Medium',
		mode: 'Normal',
	});

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
				<div className='content'>
					{renderContent()}
				</div>
			</NavigationContext.Provider>
		</>
	);
}

export default App;
