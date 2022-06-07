import {createContext, useEffect, useState} from 'react';

export const PostContext = createContext([]);

export const PostProvider = ({children}) => {
    
    const [posts, setPosts] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        const localData = localStorage.getItem('faves');
        return localData? JSON.parse(localData) : [];
    });
    const [allOrFaves, setAllOrFaves] = useState(() => localStorage.getItem('allOrFaves') || 'all');
    const [filter, setFilter] = useState(() => localStorage.getItem('filter')?.toLowerCase());

    useEffect(() => {
        localStorage.setItem('faves', JSON.stringify(favorites));     
    },[favorites])

    return(
        <PostContext.Provider value={{
            posts,
            setPosts,
            favorites,
            setFavorites,
            allOrFaves,
            setAllOrFaves,
            filter,
            setFilter
        }}>
            {children}
        </PostContext.Provider>
    ) 
}