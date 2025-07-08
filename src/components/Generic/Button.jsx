export default function Button({
	id,
	clickAction = () => {},
	text,
	icon = '',
}) {
	return (
        <button type='submit' className='pixel-button' id={id} onClick={clickAction}>
            {icon} {text}
        </button>
    );
}
