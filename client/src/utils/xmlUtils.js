import { XMLParser, XMLBuilder } from "fast-xml-parser";

export const xmlToJson = (xmlString) => {
  const parser = new XMLParser({ ignoreAttributes: false });
  return parser.parse(xmlString);
};

export const jsonToXml = (jsonData, rootElement = "booking") => {
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true, // Pretty print
    indentBy: "  ", // 2-space indentation
    suppressEmptyNode: true,
  });
  return builder.build({ [rootElement]: jsonData });
};
