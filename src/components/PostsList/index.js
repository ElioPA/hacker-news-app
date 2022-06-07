import { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { getPostsRequest } from "../../services/getPostsRequest";
import { PostCard } from "../PostCard";
import { Spinner } from "../Spinner";
import { v4 as uuidv4 } from 'uuid';
import './styles.css';

export function PostsList() {

    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const { filter, posts, setPosts, favorites, allOrFaves } = useGlobalContext();
    const ref = useRef();
    const totalPages = useRef(1000);

    const fetchData = useCallback(async (query, page) => {
        setIsLoading(true);
        const { postsData, totalPage } = await getPostsRequest({ query, page });
        totalPages.current = totalPage;     
        setPosts(prev => prev.concat(postsData));
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
                rootMargin: '100px'
            });

            show && observer.observe(ref.current);
            return () => observer.disconnect();
        }
    }, [allOrFaves, show]);

    useEffect(() => {
        if(!(currentPage < totalPages.current)){
            setShow(false);
            return;
        }
        filter && fetchData(filter, currentPage);
    }, [currentPage, filter, fetchData]);

    useEffect(() => {
        return () => {
            setPosts([]);
        };
    }, [filter, setPosts]);

    return (
        <>
            <section className="postList">
                {(allOrFaves === 'all')
                    ? posts?.map(post => <PostCard key={uuidv4()} post={post} />)
                    : favorites?.filter(post => post.query === filter)
                        .map(post => <PostCard key={uuidv4()} post={post} />)}
            </section>
            <div ref={ref} className="ref">{isLoading ? <Spinner /> : null}</div>
        </>
    )
}
