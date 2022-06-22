import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import Switch from 'react-switch';
import './styles.css';

export function DarkMode() {

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className='darkMode-container'>
            <div className='light-icon'>
                <FaSun size={20} color={theme === 'light' ? 'yellow' : 'grey'} />
            </div>
            <Switch
                id='checkbox'
                checked={theme === 'dark'}
                onChange={toggleTheme}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                handleDiameter={20}
                height={15}
                width={36}
            />
            <div className='dark-icon'>
                <FaMoon size={15} color={theme === 'dark' ? '#c96dfd' : 'grey'} />
            </div>
        </div>
    )
}
