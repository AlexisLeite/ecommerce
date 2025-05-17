import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

export type TMessage = {
  id: any;
  local: boolean;
  message: ReactNode;
  user: string;
  date: string;
};

export const History = observer(({ messages }: { messages: TMessage[] }) => {
  let currentUser = "";
  let isLocal = false;

  return (
    <div className={"chat_history"}>
      {messages.map((c, i) => {
        let isFirst = false;
        let isLast = false;
        let changedUser = false;

        if ((c.local && !isLocal) || (!c.local && isLocal)) {
          isFirst = true;
          isLocal = c.local;
          changedUser = true;
        }
        if (i < messages.length - 1 && messages[i + 1].local !== c.local) {
          isLast = true;
        }
        if (c.user !== currentUser) {
          changedUser = true;
          currentUser = c.user;
        }

        return (
          <div
            key={c.id}
            className={`chat_message ${c.local ? "local" : "remote"} ${isFirst ? "first" : ""} ${isLast ? "last" : ""}`}
          >
            {changedUser && (
              <div className={"chat_message_author"}>{currentUser}</div>
            )}
            {c.message}
            <small className={"date"}>
              {new Date(c.date).toLocaleString("es-ES", {
                dateStyle: "short",
                timeStyle: "short",
                hour12: false,
              })}
            </small>
          </div>
        );
      })}
    </div>
  );
});
