import { useState } from 'react';
import Button from '@/components/Generic/Button.jsx';
import HelpIcon from '@/assets/help-circle.svg';
import '@/styles/HelpButton.css';

export default function HelpButton({ className = '' }) {
	const [showHelp, setShowHelp] = useState(false);

	const toggleHelp = () => {
		setShowHelp(prev => !prev);
	};

	return (
		<div className={`help-button-container ${className}`}>
			<Button
				icon={HelpIcon}
				clickAction={toggleHelp}
				className='pixel-button game-help-button'
				title='How to Play'
			/>

			{showHelp && (
				<div className='help-popover'>
					<h3>How to Play</h3>
					<div>
						<p>There is only one rule.</p>
						<p>You should not click on a card that you have already clicked on.</p>
						<p>You must memorize them!</p>
					</div>
					<button onClick={toggleHelp} className='close-help'>Close</button>
				</div>
			)}
		</div>
	);
}
