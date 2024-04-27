import React, { useState, useCallback } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap"; // Import Alert for error display
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";
import draftToHtml from "draftjs-to-html"

const NewBlogPost = props => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Stato per indicatore di caricamento
  const [error, setError] = useState(null); // Stato per memorizzare eventuali errori

  const handleChange = useCallback(value => {
    setText(draftToHtml(value));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Indica che la richiesta è in corso
    setError(null); // Azzera eventuali errori precedenti

    if (!title || !category) {
      setError("Titolo e Categoria sono obbligatori");
      setIsLoading(false);
      return;
    }

    const blogPostData = {
      title,
      category,
      content: text
    };

    try {
      const response = await fetch("http://localhost:3001/blogs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogPostData)
      });

      if (!response.ok) {
        throw new Error(`Error creating blog post: ${response.statusText}`);
      }

      // Handle successful creation (e.g., clear form, display success message)
      console.log("Blog post created successfully!");
      setTitle("");
      setCategory("");
      setText("");
    } catch (error) {
      console.error("Error creating blog post:", error);
      setError(error.message); // Imposta l'errore da visualizzare all'utente
    } finally {
      setIsLoading(false); // Termina lo stato di caricamento indipendentemente dall'esito
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <Editor value={text} onChange={handleChange} className="new-blog-content" />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}  {/* Condizione per mostrare l'errore */}
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button type="submit" size="lg" variant="dark" style={{ marginLeft: "1em" }} disabled={isLoading}>
            {isLoading ? "Creazione in corso..." : "Invia"}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
