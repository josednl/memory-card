import '@/styles/MainMenu.css';
import Button from '@/components/Generic/Button.jsx';
import GameBoard from '@/components/Gameplay/GameBoard.jsx';

export default function MainMenu({ onSelect }) {
	const navOptions = [
		{
			id: 'play',
			text: 'Play',
			screen: 'game',
		},
		{
			id: 'settings',
			text: 'Settings',
			screen: 'settings',
		},
	];

	return (
		<div className='menu'>
			<h1 className='main-title multicolor-text'>Memory Card Game</h1>
			<nav>
				<ul className='menu-buttons-box'>
					{navOptions.map((option) => (
						<li key={option.id}>
							<Button
								text={option.text}
								className='pixel-button main-menu-button'
								clickAction={() => onSelect(option.screen)}
							/>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
