import { useState, useEffect } from "react";

export default function BlogFetcher() {
  // State variables to manage blog data and loading status
  const [blogs, setBlogs] = useState([]); // Stores the fetched blog posts
  const [loading, setLoading] = useState(true); // Indicates whether data is loading

  // Function to fetch all blog posts
  const getAllPosts = async () => {
    try {
      const response = await fetch("http:localhost:3001/blogs"); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error(`Error fetching blog posts: ${response.statusText}`);
      }
      const data = await response.json();
      setBlogs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      setLoading(false); // Set loading to false even on error
    }
  };

  // Function to fetch a specific blog post by ID
  const getPostById = async (_id) => {
    try {
      const response = await fetch(`http:localhost:3001/blogs/${_id}`); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error(`Error fetching blog post: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      return data; // Return the fetched post data
    } catch (error) {
      console.error("Error fetching blog post:", error);
      throw error; // Re-throw error for handling in the Blog component
    }
  };

  // Effect hook to fetch blog posts on component mount
  useEffect(() => {
    getAllPosts();
  }, []);

  return {
    blogs,
    loading,
    getAllPosts,
    getPostById,
  };
}

