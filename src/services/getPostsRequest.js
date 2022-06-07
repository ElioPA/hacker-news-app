import axios from 'axios';

export const getPostsRequest = async ({ query, page = 0 } = { query: "", page: 0 }) => {
    const api_url = `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`;
    const { data } = await axios.get(api_url);
    const validPosts = data.hits
        .filter(post => post.author && post.story_title && post.story_url && post.created_at)
        .map(post => ({ ...post, query }));

    return {
        postsData: validPosts,
        totalPage: data.nbPages
    };
}