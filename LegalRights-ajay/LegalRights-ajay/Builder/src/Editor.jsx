import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import { TableModule } from "quill-table";

// Extend the font size options
const Font = Quill.import("formats/font");
Font.whitelist = ["Rockwell", "sans-serif"];
Quill.register(Font, true);

const Size = Quill.import("attributors/style/size");
Size.whitelist = ["12px", "11px"];
Quill.register(Size, true);

export default function Editor({ value, onChange }) {
  useEffect(() => {
    const FontStyle = Quill.import("attributors/style/font");
    FontStyle.whitelist = ["rockwell", "sans-serif"];
    Quill.register(FontStyle, true);

    // Add custom font-family to editor
    const fonts = ["rockwell", "sans-serif"];
    const fontStyles = fonts
      .map(
        (font) => `
        .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=${font}]::before,
        .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=${font}]::before {
          content: '${font}';
          font-family: ${font};
        }
        .ql-font-${font} {
          font-family: ${font};
        }
      `
      )
      .join("");

    const style = document.createElement("style");
    style.innerHTML = fontStyles;
    document.head.appendChild(style);
  }, []);

  const modules = {
    toolbar: [
      [{ font: [] }], // Add font dropdown
      [{ size: ["14px", "11px"] }], // Add custom font sizes
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
      ["table"], // Table button
    ],
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
 