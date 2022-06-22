import { createContext, useEffect, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {

    const [favorites, setFavorites] = useState(() => {
        const localData = localStorage.getItem('faves');
        return localData ? JSON.parse(localData) : [];
    });

    const [allOrFaves, setAllOrFaves] = useState(() => localStorage.getItem('allOrFaves') || 'all');

    useEffect(() => {
        localStorage.setItem('faves', JSON.stringify(favorites));
    }, [favorites])

    return <FavoritesContext.Provider value={{ favorites, allOrFaves, setFavorites, setAllOrFaves }}>
        {children}
    </FavoritesContext.Provider>
}