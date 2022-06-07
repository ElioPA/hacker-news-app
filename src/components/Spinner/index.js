import { FaSpinner } from 'react-icons/fa';
import './styles.css';

export function Spinner() {
    return (
        <div className='spinner'>
            <FaSpinner className='spinner__icon'/>
        </div>
    )
}
