import { useEffect, useState, useCallback } from 'react';
import { getPostsRequest } from '../services/getPostsRequest';
import { useGlobalContext } from './useGlobalContext';

export function useMixLatestPosts() {

    const { filter } = useGlobalContext();
    const [mixPosts, setMixPosts] = useState([]);

    const latestPosts = (posts = []) => {
        const hourToMlseconds = 60 * 60 * 1000;
        const currentTime = new Date().getTime();
        return posts.filter(post => currentTime - new Date(post.created_at).getTime() < hourToMlseconds)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    const posts = useCallback(async () => {
        const angularPosts = await getPostsRequest({ query: 'angular' });
        const reactPosts = await getPostsRequest({ query: 'react' });
        const vuePosts = await getPostsRequest({ query: 'vue' });
        setMixPosts(latestPosts(
            [...angularPosts.postsData, ...reactPosts.postsData, ...vuePosts.postsData]
        ));
    }, []);

    useEffect(() => {
        filter === 'Breaking' && posts();
    }, [posts, filter]);

    return mixPosts;
}