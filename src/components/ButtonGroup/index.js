import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import './styles.css';

export function ButtonGroup() {

    const [toggle, setToggle] = useState(true);
    const { setAllOrFaves } = useGlobalContext();

    const handleInput = ({target}) => {
        setAllOrFaves(target.value);
        localStorage.setItem('allOrFaves', target.value);
        setToggle(!toggle);
    }

    useEffect(() => {
        if (localStorage.getItem('allOrFaves') === 'all') {
            setToggle(true);
            setAllOrFaves('all');
        } else if (localStorage.getItem('allOrFaves') === 'faves') {
            setToggle(false);
            setAllOrFaves('faves');
        }
    }, [setAllOrFaves]);

    return (
        <div className='container-buttonGroup'>
            <div className='radio'>
                <input className='radio__input' onChange={handleInput} name='myRadio' value='all' type="radio" id='radio1' checked={toggle} />
                <label className='radio__label radio__label--all' htmlFor='radio1'>All</label>
                <input className='radio__input' onChange={handleInput} name='myRadio' value='faves' type="radio" id='radio2' checked={!toggle} />
                <label className='radio__label radio__label--fav' htmlFor='radio2'>My faves</label>
            </div>
        </div>
    )
}
