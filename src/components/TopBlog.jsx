import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import ArticleItem from "./ArticleItem";
const TopBlog = () => {
    const { blogState, fetchBlog } = useContext(AppContext);

    useEffect(() => {
        fetchBlog();
    }, [blogState.blogData]);
    return (
        <div className="blog">
            <h1 className="cat-heading">مقالات پر بازدید</h1>
            <div className="blog-container">
                {blogState.blogData.slice(0, 2).map((blogItem) => (
                    <ArticleItem key={blogItem.id} blog={blogItem} />
                ))}
            </div>
        </div>
    );
};

export default TopBlog;
