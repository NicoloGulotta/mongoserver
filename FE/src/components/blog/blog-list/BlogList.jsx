import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import Blog from "../../../views/blog/Blog";

const BlogList = props => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:3001/blogs"
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Fetch failed: " + response.status);
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <Row>
      {data && data.map((data, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={data.title} {...data} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;