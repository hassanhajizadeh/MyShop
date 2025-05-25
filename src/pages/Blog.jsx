import React, { useEffect, useContext } from "react";
import ArticleItem from "../components/ArticleItem";
import { AppContext } from "../context/AppContext";
import Loading from '../components/Loading'
const Blog = () => {
    const { blogState, fetchBlog } = useContext(AppContext);

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className="blog">
            <div className="page-header">
                <h1>مقالات</h1>
            </div>

            {blogState.loading && <Loading/>}
            {blogState.error && <p>خطا: {blogState.error}</p>}

            <div className="blog-container">
                {blogState.blogData.map(blogItem => (
                    <ArticleItem key={blogItem.id} blog={blogItem} />
                ))}
            </div>
        </div>
    );
};

export default Blog;
