import { useEffect, useState, useCallback, useRef } from "react";
import { getFeedsWithPagination } from "/services/feeds";
import Feeds from "./Feeds";

export default function FeedsContainer(props) {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const observer = useRef();
    const PAGE_SIZE = 10;

    useEffect(() => {
        loadFeeds();
    }, []);

    const loadFeeds = async () => {
        try {
            setLoading(true);
            const data = await getFeedsWithPagination(0, PAGE_SIZE);
            setFeeds(data);
            setPage(1);
            setHasMore(data.length === PAGE_SIZE);
        } catch (error) {
            console.error("피드 로딩 실패:", error);
            setFeeds([]);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreFeeds = async () => {
        if (loadingMore || !hasMore) return;
        
        try {
            setLoadingMore(true);
            const data = await getFeedsWithPagination(page, PAGE_SIZE);
            
            if (data.length > 0) {
                setFeeds(prev => [...prev, ...data]);
                setPage(prev => prev + 1);
                setHasMore(data.length === PAGE_SIZE);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("추가 피드 로딩 실패:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    const lastFeedElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMoreFeeds();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return <>
        <Feeds 
            {...props} 
            feeds={feeds} 
            loading={loading} 
            setFeeds={setFeeds}
            lastFeedElementRef={lastFeedElementRef}
            loadingMore={loadingMore}
            hasMore={hasMore}
        />
    </>
}