import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import { TableModule } from "quill-table";

// Extend the font size options
const Font = Quill.import("formats/font");
Font.whitelist = ["Rockwell", "sans-serif"];
Quill.register(Font, true);

const fontSizeArr = ['8px','9px','10px','12px']
  // ,'12px','14px','16px','20px','24px','32px','42px','54px','68px','84px','98px'];
const Size = Quill.import("attributors/style/size");
Size.whitelist = fontSizeArr;
Quill.register(Size, true);
let toolbarOptions = [
    [{ 'size': fontSizeArr,'name':"font-size" }],
];

export default function Editor({ value, onChange }) {
  useEffect(() => {
    const FontStyle = Quill.import("attributors/style/font");
    FontStyle.whitelist = ["rockwell", "sans-serif"];
    Quill.register(FontStyle, true);

    

// let Size = Quill.import('attributors/style/size');
// Size.whitelist = fontSizeArr;
// Quill.register(Size, true);

    // Add custom font-family to editor
    const fonts = ["Rockwell", "sans-serif"];
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
      // [{ size: ["14px", "11px"] }], // Add custom font sizes
      ...toolbarOptions,
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
