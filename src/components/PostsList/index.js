import { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { getPostsRequest } from "../../services/getPostsRequest";
import { PostCard } from "../PostCard";
import { Spinner } from "../Spinner";
import { useMixLatestPosts } from "../../hooks/useMixLatestPosts";
import { useFavorites } from '../../hooks/useFavorites';
import './styles.css';

export function PostsList() {

    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const { filter, posts, setPosts } = useGlobalContext();
    const { favorites, allOrFaves } = useFavorites();
    const breakingNews = useMixLatestPosts();

    const ref = useRef();
    const totalPages = useRef(1000);

    const removeDuplicates = (arrPosts = []) => {
        let hash = {}
        return arrPosts.filter(post => hash[post.objectID + post.query] ? false : hash[post.objectID + post.query] = true);
    }

    const fetchData = useCallback(async (query, page) => {
        setIsLoading(true);
        const { postsData, totalPage } = await getPostsRequest({ query, page });
        totalPages.current = totalPage;
        setPosts(prev => removeDuplicates(prev.concat(postsData)));
        setIsLoading(false);
        setShow(true);
    }, [setPosts]);

    useEffect(() => {
        if (allOrFaves === "all") {
            const onChange = (entries, observer) => {
                if (entries[0].isIntersecting) {
                    setCurrentPage(prev => prev + 1);
                }
            }
            const observer = new IntersectionObserver(onChange, {
                rootMargin: '150px'
            });

            show && observer.observe(ref.current);
            return () => observer.disconnect();
        }
    }, [allOrFaves, show]);

    useEffect(() => {
        if (!(currentPage < totalPages.current)) {
            setShow(false);
            return;
        }
        filter !== 'Breaking' ? fetchData(filter.toLowerCase(), currentPage) : setPosts(breakingNews);
    }, [currentPage, filter, fetchData, setPosts, breakingNews]);

    useEffect(() => {
        return () => {
            setPosts([]);
        };
    }, [filter, setPosts]);

    return (
        <>
            <section className="postList">
                {(allOrFaves === 'all')
                    ? posts?.map(post => <PostCard key={post.objectID + post.query} post={post} />)
                    : favorites?.filter(post => post.query === filter?.toLowerCase() || filter === 'Breaking')
                        .map(post => <PostCard key={post.objectID + post.query} post={post} />)}
            </section>
            <div ref={ref} className="ref">{isLoading ? <Spinner /> : null}</div>
        </>
    )
}
