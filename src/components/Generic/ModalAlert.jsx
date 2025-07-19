import '@/styles/ModalAlert.css';

export default function ModalAlert({ title, message, onClose }) {
    return(
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={onClose}>Ok</button>
            </div>
        </div>
    )
}
