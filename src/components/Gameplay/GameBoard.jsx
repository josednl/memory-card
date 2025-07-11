import '@/styles/GameBoard.css';
import { useState, useEffect, useCallback } from 'react';
import { getRandomPokemonList } from '../../services/pokemonService.js';
import { shuffleArray } from '@/utils/shuffleArray.js';
import BackButton from '@/components/Generic/BackButton.jsx';
import GameCard from '@/components/Generic/GameCard.jsx';

export default function GameBoard({ config }) {
	const [cards, setCards] = useState([]);
	const [flipped, setFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
	const [clickedIds, setClickedIds] = useState(new Set());
	const [currentScore, setCurrentScore] = useState(0);
	const [bestScore, setBestScore] = useState(() => {
		const savedBest = localStorage.getItem('bestScore');
		return savedBest ? parseInt(savedBest, 10) : 0;
	});
	console.log(config);

   useEffect(() => {
		let isMounted = true;

		const fetchCards = async () => {
			try {
			const data = await getRandomPokemonList(10);
			if (isMounted) {
				setCards(data);
			}
			} catch (error) {
				console.error('Error fetching Pokémon:', error);
			}
		};

		fetchCards();

		return () => {
			isMounted = false;
		};

	}, []);

	const handleCardClick = useCallback((id) => {
		if (isAnimating) return;

		const wasAlreadyClicked = clickedIds.has(id);

		if (wasAlreadyClicked) {
			alert('You lost');
			setTimeout(() => {
				setCards(prev => shuffleArray(prev));
			}, 500);
			setCurrentScore(0);
			setClickedIds(new Set());
			return;
		}

		setIsAnimating(true);
		setFlipped(true);

		setTimeout(() => {
			setCards(prev => shuffleArray(prev));
			setTimeout(() => {
				setFlipped(false);
				setIsAnimating(false);

				setClickedIds(prev => {
					const updated = new Set(prev);
					updated.add(id);

					if (updated.size === cards.length) {
						alert('You Win');
					}

					return updated;
				});

				setCurrentScore(prev => {
					const newScore = prev + 1;
					if (newScore > bestScore) {
						setBestScore(newScore);
						localStorage.setItem('bestScore', newScore);
					}
					return newScore;
				});
			}, 500);
		}, 500);
	}, [isAnimating, cards.length, bestScore, clickedIds]);


	return (
		<>
			<div className='game-container'>
				<div className='panel'>
					<BackButton />
					<div className='game-scoreboard'>
						<div className='current-score'>Current Score: {currentScore}</div> |
						<div className='best-score'>Best Score: {bestScore}</div>
					</div>
					<div className='game-difficulty'>Difficulty:</div>
				</div>
				<div className='game-board'>
					{cards.map((card) => (
						<GameCard
							key={card.id}
							id={card.id}
							front={card.sprites.front_default}
							flipped={flipped}
							onClick={() => handleCardClick(card.id)}
							disabled={isAnimating}
						/>
					))}
				</div>
			</div>	
		</>
	);
}
