import '@/styles/MainMenu.css';
import Button from '@/components/Generic/Button.jsx';

const navOptions = [
    { text: 'Play' },
    { text: 'Settings' },
];

export default function MainMenu() {
	return (
		<nav>
			<ul className='menu-buttons-box'>
                {navOptions.map((option) => (
                    <li>
                        <Button text={option.text} />
                    </li>
                ))}
				
			</ul>
		</nav>
	);
}
