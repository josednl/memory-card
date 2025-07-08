import '@/styles/MainMenu.css';
import Button from '@/components/Generic/Button.jsx';
import GameBoard from '@/components/Gameplay/GameBoard.jsx';

export default function MainMenu({ onSelect, goBack }) {
	const navOptions = [
		{
			id: 'play',
			text: 'Play',
			onClick: (goBack) => <GameBoard goBack={goBack} />,
		},
		{
			id: 'settings',
			text: 'Settings',
			onClick: () => {},
		},
	];

	return (
		<nav>
			<ul className='menu-buttons-box'>
				{navOptions.map((option) => (
					<li key={option.id}>
						<Button
							text={option.text}
							className='pixel-button main-menu-button'
							clickAction={() => onSelect(option.onClick(goBack))}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
}
