import React from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = ({ blogData }) => {
  return (
    blogData?.length > 0 ? (
      <Row>
        {blogData.map((blog, i) => (
          <Col key={`item-${i}`} md={4} style={{ marginBottom: 50 }} >
            <BlogItem key={blog.title} {...blog} />
          </Col>
        ))}
      </Row>
    ) : (
      <p>Loading blog blogs...</p>
    ))
}

export default BlogList;