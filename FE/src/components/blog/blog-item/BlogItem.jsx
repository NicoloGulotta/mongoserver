import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import BlogFetcher from "../../../data/blogFetch";
import "./styles.css";

const BlogItem = (props) => {
  const [blogData, setBlogData] = useState(null); // Store blog data
  const { title, cover, _id } = props;

  // // Fetch blog data on component mount (optional, based on BlogFetcher implementation)
  // useEffect(() => {
  //   const fetchBlogData = async () => {
  //     try {
  //       const data = await BlogFetcher(); // Assuming BlogFetcher fetches data
  //       setBlogData(data); // Set fetched data in state
  //       console.log(data);
  //       console.log(data._id);
  //     } catch (error) {
  //       console.error("Error fetching blog data:", error);
  //     }
  //   };

  //   fetchBlogData(); // Call the fetch function
  // }, []); // Empty dependency array: fetch only once

  return (
    <Link to={`/blogs/${_id}`} className="blog-link">
      <Card className="blog-card">
        <Card.Img variant="top" src={cover} className="blog-cover" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <BlogAuthor blogData={blogData} />
        </Card.Footer>
      </Card>
    </Link>
  )
}
export default BlogItem;
