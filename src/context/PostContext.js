import { createContext, useState } from 'react';

export const PostContext = createContext([]);

export const PostProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState(() => localStorage.getItem('filter') || 'Breaking');

    return (
        <PostContext.Provider value={{
            posts,
            setPosts,
            filter,
            setFilter
        }}>
            {children}
        </PostContext.Provider>
    )
}