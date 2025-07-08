import '@/styles/GameBoard.css';
import BackButton from '@/components/Generic/BackButton.jsx';

export default function GameBoard() {
    return (
        <>
        <div className='game-panel'>
            <BackButton />
            <div className='game-scoreboard'>
                <div className='current-score'>Current Score: </div> |
                <div className='best-score'>Best Score: </div>
            </div>
            <div className='game-difficulty'>
                Difficulty: 
            </div>
        </div>
        </>
    )
}
