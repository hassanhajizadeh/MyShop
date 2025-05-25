import React from "react";
import { useNavigate } from "react-router-dom";
const ArticleItem = ({ blog }) => {
    const { title, img, excerpt, content, date,id } = blog;
    const navigate = useNavigate();
    return (
        <div className="article-container" onClick={()=>navigate(`/blog/${id}`)}>
            <img src={`/blogImages/${img}`} alt="article image" />
            <div className="data">
                <h1>{title}</h1>
                <h3>{excerpt}</h3>
                <p>
                    {content.split(' ').slice(0,30).join(" ")} ... 
                </p>
                <p className="date">{date}</p>
            </div>
        </div>
    );
};

export default ArticleItem;
