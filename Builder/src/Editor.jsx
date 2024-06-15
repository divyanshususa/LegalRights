import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import { TableModule } from "quill-table";



export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }], // Justify content options
      ["link", "image"],
      ["clean"],
      ["table"] // Table button
    ]
  };

  return (
    <div className="content">
      <ReactQuill
        value={value}
        theme={"snow"}
        onChange={onChange}
        modules={modules}
        
      />
    </div>
  );
}

// import React, { useEffect, useRef } from "react";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { TableModule } from "quill-table";

// // Register the table module with Quill
// Quill.register("modules/table", TableModule);

// export default function Editor({ value, onChange }) {
//   const quillRef = useRef(null);

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" },
//       ],
//       [{ align: [] }],
//       ["link", "image"],
//       ["clean"],
//       ["table"], // Table button
//     ],
//     table: true, // Add table module
//   };

//   useEffect(() => {
//     if (quillRef.current) {
//       const quill = quillRef.current.getEditor();
//       quill.getModule("table");
//     }
//   }, []);

//   return (
//     <div className="content">
//       <ReactQuill
//         ref={quillRef}
//         value={value}
//         theme="snow"
//         onChange={onChange}
//         modules={modules}
//       />
//     </div>
//   );
// }
