import '@/styles/GameBoard.css';
import { useState, useEffect } from 'react';
import { getRandomPokemonList } from '@/services/pokemonService.js';
import { getRandomAnimes, getRandomMangas, getRandomMixedCharacters } from '@/services/animeService.js';
import { shuffleArray } from '@/utils/shuffleArray.js';
import ModalAlert from '@/components/Generic/ModalAlert.jsx';
import BackButton from '@/components/Generic/BackButton.jsx';
import HelpButton from '@/components/Generic/HelpButton.jsx';
import RestartButton from '@/components/Generic/RestartButton.jsx';
import GameCard from '@/components/Generic/GameCard.jsx';

export default function GameBoard({ config }) {
	const [cards, setCards] = useState([]);
	const [flipped, setFlipped] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [clickedIds, setClickedIds] = useState(new Set());
	const [previousCards, setPreviousCards] = useState([]);
	const [currentScore, setCurrentScore] = useState(0);
	const [loading, setLoading] = useState(true);
	const [modal, setModal] = useState({ show: false, title: '', message: '' });
	const [gameOver, setGameOver] = useState(false);
	const [bestScore, setBestScore] = useState(() => {
		const savedBest = localStorage.getItem('bestScore');
		return savedBest ? parseInt(savedBest, 10) : 0;
	});

	const getCardCount = () => {
		switch (config.difficulty) {
			case 'Easy':
				return 10;
			case 'Medium':
				return 20;
			case 'Hard':
				return 30;
			default:
				return 10;
		}
	};

	const loadCardsByTheme = async (count) => {
		console.log(`Loading cards for theme: ${config.theme}, count: ${count}`);
		try {
			switch (config.theme) {
				case 'Anime':
					return await getRandomAnimes(count);
				case 'Manga':
					return await getRandomMangas(count);
				case 'Anime & Manga Characters':
					return await getRandomMixedCharacters(count);
				case 'Pokémon':
				default:
					return await getRandomPokemonList(count);
			}
		} catch (error) {
			console.error(`Error loading cards for theme ${config.theme}:`, error);
			return await getRandomPokemonList(count);
		}
	};

	const loadInitialCards = async () => {
		setLoading(true);
		try {
			const num = getCardCount();
			const data = await loadCardsByTheme(num);
			setCards(data);
			setPreviousCards(data);
		} catch (err) {
			console.error('Error loading initial cards:', err);
		} finally {
			setLoading(false);
		}
	};

	const loadNextCardsInfinityMode = async () => {
		setLoading(true);
		try {
			const num = getCardCount();
			const half = Math.floor(num / 2);
			const oldHalf = shuffleArray(previousCards).slice(0, half);
			const newHalf = await loadCardsByTheme(num - half);
			const combined = shuffleArray([...oldHalf, ...newHalf]);

			setCards(combined);
			setPreviousCards(combined);
		} catch (err) {
			console.error('Error loading next Pokémon:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadInitialCards();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const restartGame = async () => {
		setCurrentScore(0);
		setClickedIds(new Set());
		setGameOver(false);
		await loadInitialCards();
	};

	const handleModalClose = () => {
		setModal({ show: false, title: '', message: '' });
		if (currentScore === 0) {
			loadInitialCards();
		}
	};

	const handleCardClick = async (id) => {
		if (isAnimating) return;

		if (clickedIds.has(id)) {
			setModal({ show: true, title: 'Game Over', message: 'You clicked the same card!' });
			setTimeout(() => {
				setCards((prev) => shuffleArray(prev));
			}, 500);
			setCurrentScore(0);
			setClickedIds(new Set());
			return;
		}

		setIsAnimating(true);
		setFlipped(true);

		setTimeout(async () => {
			setCards((prev) => shuffleArray(prev));
			if (config.mode === 'Infinity') {
				await loadNextCardsInfinityMode();
			}

			setTimeout(async () => {
				setFlipped(false);
				setIsAnimating(false);
				setClickedIds((prev) => {
					const updated = new Set(prev);
					updated.add(id);

					if (updated.size === cards.length && config.mode !== 'Infinity') {
						setModal({ show: true, title: 'You Win!', message: 'Congratulations, you clicked all the cards!' });
						setGameOver(true);
					}

					return updated;
				});

				setCurrentScore((prev) => {
					const newScore = prev + 1;
					if (newScore > bestScore) {
						setBestScore(newScore);
						localStorage.setItem('bestScore', newScore);
					}
					return newScore;
				});
			}, 500);
		}, 500);
	};

	return (
		<>
			<div className='game-container'>
				<div className='panel'>
					<div className='game-left'>
						<BackButton />
						<HelpButton />
						<RestartButton onRestart={restartGame} />
					</div>
					<div className='game-mid'>
						<div className='current-score'>
							Current Score: {currentScore}
						</div>{' '}
						|
						<div className='best-score'>
							Best Score: {bestScore}
						</div>
					</div>
					<div className='game-right'>
						Difficulty:{' '}
						<span className={`${config.difficulty.toLowerCase()}`}>
							{config.difficulty}
						</span>
					</div>
				</div>
				<div className='game-board'>
					{loading ? (
						<div className='loader-container'>
							<div className='loader'></div>
						</div>
					) : (
						cards.map((card) => (
							<GameCard
								key={card.id}
								id={card.id}
								title={card.name}
								image={card?.sprites?.front_default ?? card?.imageUrl}
								flipped={flipped}
								onClick={() => handleCardClick(card.id)}
								disabled={isAnimating || gameOver}
							/>
						))
					)}
					{modal.show && (
						<ModalAlert
							title={modal.title}
							message={modal.message}
							onClose={handleModalClose}
						/>
					)}
				</div>
			</div>
		</>
	);
}
