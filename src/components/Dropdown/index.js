import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../hooks/useGlobalContext';
import { angularIcon, reactIcon, vueIcon } from '../../assets';
import { HiOutlineChevronDown } from 'react-icons/hi';

import './styles.css';

export const Dropdown = () => {

    const [wasClicked, setWasClicked] = useState(false);
    const [selected, setSelected] = useState("Select your news");

    const { setFilter } = useGlobalContext();

    const handleClickDropdown = () => {
        setWasClicked(!wasClicked);
    }

    const handleClickSelected = (filter) => {
        setSelected(filter);
        setWasClicked(false);
        setFilter(filter);
        localStorage.setItem('filter', filter);
    }

    useEffect(() => {
        if (localStorage.getItem('filter')) {
            setSelected(localStorage.getItem('filter'));
        }
    }, [])


    return (
        <div className='dropdown'>
            <div className='dropdown__btn' onClick={handleClickDropdown}>
                {selected}
                <span><HiOutlineChevronDown className="dropdown__btn-icon" /></span>
            </div>
            {wasClicked &&
                <div className='dropdown__options'>
                    <div className='dropdown__option' onClick={() => handleClickSelected('Angular')}>
                        <span><img src={angularIcon} className="dropdown__option-icon" alt="angular icon" /></span>
                        Angular
                    </div>
                    <div className='dropdown__option' onClick={() => handleClickSelected('React')}>
                        <span><img src={reactIcon} className="dropdown__option-icon" alt="react icon" /></span>
                        React
                    </div>
                    <div className='dropdown__option' onClick={() => handleClickSelected('Vue')}>
                        <span><img src={vueIcon} className="dropdown__option-icon" alt="vue icon" /></span>
                        Vue
                    </div>
                </div>
            }
        </div>
    )
}
