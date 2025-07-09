import '@/styles/GameCards.css';
import QuestionMarkIcon from '@/assets/question_mark.svg';

export default function GameCard({ id, front, flipped, onClick, disabled}) {
	return (
		<>
			<div
				className={`card ${flipped ? 'flipped' : ''}`}
				onClick={disabled ? undefined : onClick}
			>
				<div className='card-inner'>
					<div className='card-front'>
						<img src={front} alt={`Pokemon ${id}`} />
					</div>
					<div className='card-back'>
						<img
							className='card-back-cover'
							src={QuestionMarkIcon}
							alt='Card back'
						/>
					</div>
				</div>
			</div>
		</>
	);
}
