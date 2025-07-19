import '@/styles/GameCards.css';
import QuestionMarkIcon from '@/assets/question_mark.svg';

export default function GameCard({ id, image, title, flipped, onClick, disabled }) {
	return (
		<>
			<div
				className={`card ${flipped ? 'flipped' : ''}`}
				onClick={disabled ? undefined : onClick}
			>
				<div className='card-inner'>
					<div className='card-front'>
						<div className='card-image'>
							<img src={image} alt={`${title, id}`}/>	
						</div>
						<div className='card-footer'>
							<div className='card-title' title={title}>{title}</div>
						</div>
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
