import './App.css';
import { useState } from 'react';
import MainMenu from '@/components/Menu/MainMenu.jsx';
import { NavigationContext } from '@/components/Context/NavigationContext.jsx';

function App() {
	const [activeComponent, setActiveComponent] = useState(null);
	const goBack = () => setActiveComponent(null);

	return (
		<>
			<NavigationContext.Provider value={{ goBack }}>
				{activeComponent ? (
					<div className='content'>
						{activeComponent}
					</div>
				) : (
					<div className='menu'>
						<h1 className='main-title multicolor-text'>Memory Card Game</h1>
						<MainMenu onSelect={setActiveComponent} />
					</div>
				)}
			</NavigationContext.Provider>
		</>
	);
}

export default App;
