import React from "react";
import { Typography } from "../../node_modules/@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const XmlPreview = ({ xmlData }) => {
  // console.log("Rendering XML Preview with data:", xmlData);
  if (!xmlData) {
    return (
      <div style={{ marginTop: "1rem" }}>
        <Typography variant="subtitle1" gutterBottom>
          No XML data to preview
        </Typography>
      </div>
    );
  }
  return (
    <div style={{ marginTop: "1rem" }}>
      <Typography variant="subtitle1" gutterBottom>
        XML Preview
      </Typography>
      <SyntaxHighlighter language="xml" style={materialDark}>
        {xmlData}
      </SyntaxHighlighter>
    </div>
  );
};

export default XmlPreview;
