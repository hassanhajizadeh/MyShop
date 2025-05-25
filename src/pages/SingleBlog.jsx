import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from '../components/Loading';

const SingleBlog = () => {
    const [blog, setBlog] = useState(null);
    const {blogId} = useParams();
    const { blogDispatch, blogState, fetchBlog } = useContext(AppContext);

    useEffect(() => {
        fetchBlog();
    }, []);
    useEffect(() => {
        if (blogState.blogData.length > 0) {
            const found = blogState.blogData.find((b) => String(b.id) === blogId);
            setBlog(found);
        }
    }, [blogState.blogData, blogId]);

    const { loading, error } = blogState;

    if (loading) return <Loading />;
    if (error) return <h3>{error}</h3>;
    if (!blog) return <h3>مقاله پیدا نشد</h3>;

    return (
        <div className="single-blog">
            <img src={`/blogImages/${blog.img}`} alt="" />
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
        </div>
    );
};

export default SingleBlog;
