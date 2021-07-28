import { useState } from "react";

import styles from "../posts.module.css";

const PostDescription = (props) => {
  const [expandText, setExpandText] = useState(false);
  let postDescription = props.description;

  const toggleTextExpandHandler = () => {
    setExpandText(!expandText);
  };

  if (props.description.length > 100) {
    let text;
    if (!expandText) {
      text = postDescription.substr(0, 100);
    } else {
      text = props.description;
    }
    postDescription = (
      <div>
        <span>{text}</span>
        <span className={styles.seemore} onClick={toggleTextExpandHandler}>
          {expandText ? "See less" : "See More"}
        </span>
      </div>
    );
  }
  return <p>{postDescription}</p>;
};

export default PostDescription;
