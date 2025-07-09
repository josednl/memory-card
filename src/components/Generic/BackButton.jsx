import Button from '@/components/Generic/Button.jsx';
import LeftArrowIcon from '@/assets/chevron-left.svg';
import { useNavigation } from '@/components/context/NavigationContext.jsx';

export default function BackButton({ className = '' }) {
	const { goBack } = useNavigation();

	return (
		<Button
			text='Back'
			icon={LeftArrowIcon}
			clickAction={goBack}
			className={`pixel-button game-back-button ${className}`}
			title='Back to Menu'
            iconStyles={{ filter: 'invert(1)' }} 
		/>
	);
}
