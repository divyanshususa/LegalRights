import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import axios from "../Service/axios";
import { Select, Button } from "antd";


export default function PreviewTemplate({ temp}) {
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  console.log("Preview temp", temp,);

const [user, setUser]= useState( JSON.parse(localStorage.getItem("user")))
console.log("this is user data", user)
  const gettemplate=async()=>{
    try {
      const res = await axios.get(`http://localhost:5000/templates/templates/name/${temp}`)
      setContent(res.data.template.descriptions)
      console.log("slfal",res.data.template)
    } catch (error) {
      
    }
  }

  async function createNewPost(ev) {
    ev.preventDefault();

    try {
      const response = await axios.post(
        "/api/Createposts",
        {
          description: content,
          Name: temp,
          userId:user._id
        },
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   withCredentials: true,
        // }
      );

      if (response.status === 201) {
        // setRedirect(true);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Failed to create post:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
      }
    }
  }

  if (redirect) {
    return <Navigate to="/choosetemplate" />;
  }

  return (
    <>
    <Button type="primary" className="template-choose-button" onClick={gettemplate}>
          Submit
        </Button>
    <form onSubmit={createNewPost} style={{marginTop:"50px"}}>
      <Editor
        value={content}
        onChange={setContent}
        createNewPost={createNewPost}
        
      />
      <button style={{ marginTop: "5px" }}>Create post</button>
    </form>
    </>
  );
}
