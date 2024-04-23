import React, { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { Button } from "react-bootstrap";
const yourUserId = "123";
export default function BlogLike({ defaultLikes, onChange }) {
  const [likes, setLikes] = useState(defaultLikes);
  const miPiaceQuestoArticolo = likes.includes(yourUserId);
  const toggleMiPiace = () => {
    if (miPiaceQuestoArticolo) {
      setLikes(likes.filter((id) => id !== yourUserId));
    } else {
      setLikes([...likes, yourUserId]);
    }
    onChange && onChange(likes);
  };
  useEffect(() => {
    onChange && onChange(likes);
  }, [likes, onChange, miPiaceQuestoArticolo]);
  return (
    <div>
      <Button
        onClick={toggleMiPiace}
        variant={miPiaceQuestoArticolo ? "dark" : "dark-outline"}
      >
        <AiOutlineLike /> {`${likes.length} mi piace`}
      </Button>
    </div>
  );
}