import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import post from "../../components/data/posts.json";
import "./styles.css";
const Blog = props => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Load data from the JSON file
        const blogData = post.find((post) => post._id.toString() === id);
        console.log("Dati del blog recuperati:", blogData);
        if (blogData) {
          setBlog(blogData);
          setLoading(false);
        } else {
          // Handle blog not found scenario
          console.error("Blog not found");
          //  Redirect to a different route
          // navigate('/home');
          return <div>Blog not found.</div>;
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]); // Dependency array to trigger re-fetch on ID change

  if (loading) {
    return <div>Loading blog...</div>;
  }

  if (!blog) {
    // Handle blog not found scenario (e.g., display error message)
    console.error("Blog not found");
    // Optional: Redirect to a different route
    // navigate('/blogs');
    return <div>Blog not found.</div>;
  }

  // Render blog details here (using blog data)
  return (
    <div className="blog-details-root">
      {loading ? (
        <div>Loading blog...</div>
      ) : blog ? (
        // Render blog details using blog data
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
      ) : (
        <div>Blog not found.</div>
      )}
    </div>
  );
}


export default Blog;
