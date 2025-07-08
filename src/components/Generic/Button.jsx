import '@/styles/Buttons.css';

export default function Button({
	id,
	className = '',
	clickAction = () => {},
	text,
	title = '',
	icon = '',
	iconStyles = '',
	iconAlt = '',
}) {
	return (
		<button
			type='button'
			title={title}
			id={id}
			className={className}
			onClick={clickAction}
		>
			{icon && <img src={icon} alt={iconAlt} style={iconStyles} />} 
			{text}
		</button>
	);
}
