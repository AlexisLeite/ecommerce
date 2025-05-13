import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { IconButton } from "../form";
import { MdClose } from "@meronex/icons/ios";

export type TNotification = {
  canClose?: boolean;
  text: string;
  title: string;
  type?: "success" | "info" | "danger" | "warning";
};

export class Notification {
  public state: TNotification & { closing: boolean };
  public id = Notifications.getNewId();

  constructor(state: TNotification) {
    this.state = { ...state, closing: false };
    makeObservable(this, { state: observable, close: action });
  }

  close() {
    if (this.state.canClose !== false) {
      this.state.closing = true;
      setTimeout(() => {
        Notifications.instance.remove(this);
      }, 150);
    }
  }
}

type NotificationsState = {
  notifications: Notification[];
};

const NotificationRenderer: FC<{
  notification: Notification;
}> = observer(({ notification }) => {
  const {
    state: { type, canClose, text, title, closing },
  } = notification;

  return (
    <div
      className={`notification ${type} ${closing ? "closing" : ""}`}
      aria-live={"polite"}
      role={"alert"}
    >
      <div className={"notification__header"}>
        <strong>{title}</strong>
        {canClose !== false && (
          <IconButton onClick={() => notification.close()}>
            <MdClose />
          </IconButton>
        )}
      </div>
      <p>{text}</p>
    </div>
  );
});

export class Notifications {
  public static instance = new Notifications();

  private static maxId = 0;
  public static getNewId() {
    return this.maxId++;
  }

  public static Provider = observer(() => {
    return (
      <div className={"notifications__wrapper"}>
        {this.instance.state.notifications.map((c) => (
          <NotificationRenderer notification={c} key={c.id} />
        ))}
      </div>
    );
  });

  state: NotificationsState = {
    notifications: [],
  };

  private constructor() {
    makeObservable(this, {
      state: observable,
      add: action,
      remove: action,
      closeAll: action,
    });

    typeof document !== "undefined" &&
      document.addEventListener(
        "keydown",
        (ev) => {
          if (ev.code === "Escape" && this.state.notifications.length) {
            ev.stopImmediatePropagation();
            this.closeAll();
          }
        },
        { capture: true },
      );
  }

  add(n: Notification) {
    this.state.notifications.push(n);
  }

  remove(n: Notification) {
    if (n.state.closing) {
      this.state.notifications = this.state.notifications.filter(
        (c) => c !== n,
      );
    } else {
      n.close();
    }
  }

  closeAll() {
    this.state.notifications.forEach((c) => c.close());
  }
}
