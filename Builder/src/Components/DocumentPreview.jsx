import React, { useState, useEffect } from "react";
import axios from "../Service/axios";
import { useParams } from "react-router-dom";

export default function DocumentPreview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postInfo, setPostInfo] = useState(null);
  const [check,setcheck]= useState(null)

  // const { id } = useParams(); // Assuming you want to get the id from the URL

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `/`
        );

 setcheck(response.data)
        setPostInfo(response.data.post.description);
        console.log(response.data.post.description)
        console.log("postInfo",postInfo)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []); // Added id as a dependency, if you want to fetch data based on changing id

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  // if (!postInfo) return "";

  return (
    <div>
      <h1>check</h1>
      {check}
      <h1>Document Preview</h1>
      <div>
        <h2>Content:</h2>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postInfo }}
        />
      </div>
    </div>
  );
}
