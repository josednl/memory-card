import Button from "@/components/Generic/Button.jsx";
import RestartIcon from '@/assets/refresh.svg';
import '@/styles/Buttons.css';

export default function RestartButton({ onRestart, className = '' }) {
    return(
        <div className={`restart-button-container ${className}`}>
            <Button 
                icon={RestartIcon}
                clickAction={onRestart}
                className='pixel-button game-restart-button'
                title='Restart Game'
            />
        </div>
    )
}
