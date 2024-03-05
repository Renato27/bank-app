import { Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { ScrollableListProps } from "./types/scrollable-list-type";
import './css/ScrollableList.css'
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const ScrollableList: React.FC<ScrollableListProps> = ({ data, loading, onLoadMore, setValue, admin }) => {
    const [listHeight, setListHeight] = useState('auto');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const calculateHeight = () => {
            const viewportHeight = window.innerHeight;
            const containerTop = containerRef.current?.getBoundingClientRect().top || 0;
            const marginBottom = 20;

            const availableHeight = `${viewportHeight - containerTop - marginBottom}px`;

            setListHeight(availableHeight);
        };

        calculateHeight();
        window.addEventListener('resize', calculateHeight);

        return () => window.removeEventListener('resize', calculateHeight);
    }, []);

    return (
        <div
            ref={containerRef}
            id="scrollableDiv"
            style={{
                height: listHeight,
                overflow: 'auto',
                padding: '0 16px',
            }}
        >
            <InfiniteScroll
                dataLength={data.length}
                next={onLoadMore}
                hasMore={data.length < 50}
                loader={loading ? <Skeleton paragraph={{ rows: 1 }} active /> : false}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.id} className="scrollable-list-item">
                            {admin ? (
                                <Link to={`/admin/check-details/${item.id}`} className="scrollable-list-link">
                                    <List.Item.Meta
                                        title={item.description}
                                        description={moment(item.date).format('MM/DD/YYYY, h:mm:ss A')}
                                    />
                                </Link>
                            ) : (
                                <List.Item.Meta
                                    title={item.description}
                                    description={moment(item.date).format('MM/DD/YYYY, h:mm:ss A')}
                                    className="scrollable-list-link"
                                />
                            )}
                            {setValue(item)}
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    );
}

export default ScrollableList;
