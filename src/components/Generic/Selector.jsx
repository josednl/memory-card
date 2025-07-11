import { useState } from 'react';
import '@/styles/Selector.css';
import leftArrowIcon from '@/assets/arrow_left.svg';
import RightArrowIcon from '@/assets/arrow_right.svg';


function Selector({ label, options = [], value, onChange }) {
	const [index, setIndex] = useState(() => {
		const idx = options.indexOf(value);
		return idx >= 0 ? idx : 0;
	});

	const goLeft = () => {
		const newIndex = (index - 1 + options.length) % options.length;
		setIndex(newIndex);
		onChange(options[newIndex]);
	};

	const goRight = () => {
		const newIndex = (index + 1) % options.length;
		setIndex(newIndex);
		onChange(options[newIndex]);
	};

	return (
		<div className='selector-container'>
			<span className='selector-label'>{label}</span>
			<div className='selector'>
				<button type='button' className='selector-button' onClick={goLeft}>
					<img src={leftArrowIcon} alt='left button' />
				</button>
				<span className='selector-option'>{options[index]}</span>
				<button type='button' className='selector-button' onClick={goRight}>
					<img src={RightArrowIcon} alt='right button' />
				</button>
			</div>
		</div>
	);
}


export default Selector;
