import '@/styles/GameBoard.css';
import { useState, useEffect, useCallback } from 'react';
import { getDetailedPokemonList } from '../../services/pokemonService.js';
import { shuffleArray } from '@/utils/shuffleArray.js';
import BackButton from '@/components/Generic/BackButton.jsx';
import GameCard from '@/components/Generic/GameCard.jsx';

export default function GameBoard() {
	const [cards, setCards] = useState([]);
	const [flipped, setFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
		const fetchCards = async () => {
			try {
				const data = await getDetailedPokemonList(10);
				setCards(data);
			} catch (error) {
				console.error('Error fetching Pokémon:', error);
			}
		};

		fetchCards();
	}, []);

    const handleCardClick = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);
        setFlipped(true);

        setTimeout(() => {
            setCards(prev => shuffleArray(prev));
            setTimeout(() => {
                setFlipped(false);
                setIsAnimating(false);
            }, 500);
        }, 500);
    }, [isAnimating]);

	return (
		<>
			<div className='game-panel'>
				<BackButton />
				<div className='game-scoreboard'>
					<div className='current-score'>Current Score: </div> |
					<div className='best-score'>Best Score: </div>
				</div>
				<div className='game-difficulty'>Difficulty:</div>
			</div>
			<div className='card-container'>
				{cards.map((card) => (
					<GameCard
						key={card.id}
						id={card.id}
						front={card.sprites.front_default}
						flipped={flipped}
                        onClick={handleCardClick}
                        disabled={isAnimating}
					/>
				))}
			</div>
		</>
	);
}
