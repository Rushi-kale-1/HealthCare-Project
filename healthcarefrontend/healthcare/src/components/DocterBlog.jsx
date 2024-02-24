import Blog from "../miniComponents/Blog.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DocterBlog() {
    const [blogs, setBlogs] = useState([]); // State to hold blogs

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3100/user/getblog',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.request(config)
            .then((response) => {
                setBlogs(response.data.blogs.allblogs);

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 mx-5'>
            {blogs.map((blog, index) => (
                <Blog key={index} title={blog.title} userId={blog.userId}  cover={blog.cover} created={blog.createdAt} blogId={blog._id} />
            ))}
        </div>
    );
}
