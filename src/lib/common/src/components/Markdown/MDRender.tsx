import ReactMarkdown from "react-markdown";
import "./MDRender.scss";
import { List } from "../List/List";
import { ListItem } from "../List/ListItem";

export const MDRender = ({ children }: { children: string }) => {
  return (
    <div className="MDRender">
      <ReactMarkdown
        components={{
          ol: ({ children }) => <List ordered>{children}</List>,
          ul: ({ children }) => <List>{children}</List>,
          li: ({ children }) => <ListItem>{children}</ListItem>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
