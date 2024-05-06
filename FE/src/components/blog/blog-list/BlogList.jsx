import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = props => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchBlog = async () => {
      try {
        // const { id } = props.params;
        const response = await fetch(`http://localhost:3001/blogs/`);

        if (!response.ok) {
          throw new Error("Blog not found");
        }

        const data = await response.json();
        setBlog(data);
        setLoading(false);
      } catch (error) {
        console.error(error);

      }
    };

    fetchBlog();
  }, [props.params, props.navigate]);

  return (
    <Row>
      {blog.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;