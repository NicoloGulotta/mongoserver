import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import BlogFetcher from "../../data/blogFetch"; // Assuming BlogFetcher is in the same directory
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";

const Blog = () => {
  // State variables to manage blog data and loading status
  const [blog, setBlog] = useState(null); // Stores the fetched blog post data
  const [loading, setLoading] = useState(true); // Indicates whether data is loading

  // Object containing URL parameters (e.g., post ID)
  const params = useParams();

  // Function for navigating between routes
  const navigate = useNavigate();

  // Effect hook to fetch and display blog post details
  useEffect(() => {
    const { _id } = params;

    BlogFetcher.getPostById(_id)
      .then((blogPost) => {
        if (blogPost) {
          setBlog(blogPost);
          console.log(blogPost); // Optionally log the blog post data
          setLoading(false);
        } else {
          console.error("Blog post not found"); // Log an error message
          navigate("/*"); // Navigate to the 404 page
        }
      })
      .catch((error) => {
        console.error("Error fetching blog post:", error);
      });
  }, [params, navigate]);

  // Conditional rendering based on loading status
  if (loading) {
    return <div>Caricamento in corso...</div>; // Display a loading message
  } else {
    // Render the blog post content if data is available
    return (
      <div className="blog-details-root">
        <Container>
          <Image
            className="blog-details-cover"
            src={blog.cover}
            fluid
          />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>
                Tempo di lettura: {blog.readTime.value} {blog.readTime.unit}
              </div>
              <div style={{ marginTop: 20 }}>
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          {/* Safely render the blog content */}
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </Container>
      </div>
    );
  }
};

export default Blog;
