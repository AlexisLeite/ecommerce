import ReactMarkdown from "react-markdown";
import { List } from "../List/List";
import { ListItem } from "../List/ListItem";
import { forwardRef, HTMLAttributes } from "react";

export const MDRender = forwardRef<
  HTMLDivElement,
  Omit<HTMLAttributes<HTMLDivElement>, "children"> & { children: string }
>(({ children, ...props }, ref) => {
  return (
    <div className="MDRender" {...props} ref={ref}>
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
});
