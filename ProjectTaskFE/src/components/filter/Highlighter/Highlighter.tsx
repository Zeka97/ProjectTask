import React from "react";
import Highlighter from "react-highlight-words";

interface iHighlightInterface {
  text: string;
  searchByValue: string | null;
}

const Highlight = ({ text, searchByValue }: iHighlightInterface) => {
  return (
    <Highlighter
      highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
      searchWords={(searchByValue || "").split(" ")}
      autoEscape
      textToHighlight={text?.toString() || ""}
    />
  );
};

export default Highlight;
