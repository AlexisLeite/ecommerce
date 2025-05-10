import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { FC } from "react";

export const Notification = () => <>NOT IMPLEMENTED NOTIFICATION</>;

type Notification = {
  canClose?: boolean;
  text: string;
  title: string;
  type?: "success" | "info" | "danger" | "warning";
};

type NotificationsState = {
  notifications: (Notification & { id: number; onClose: () => unknown })[];
};

const NotificationRenderer: FC<
  {
    onClose: () => unknown;
  } & Notification
> = ({ onClose, type, canClose, text, title }) => {
  return (
    <div className={`notification ${type}`} aria-live={"polite"} role={"alert"}>
      <div className={"notification__header"}>
        <strong>{title}</strong>
        {canClose && <button onClick={onClose}>x</button>}
      </div>
      <p>{text}</p>
    </div>
  );
};

export class Notifications {
  public static instance = new Notifications();
  public static Provider = observer(() => {
    return (
      <div className={"notifications__wrapper"}>
        {this.instance.state.notifications.map((c) => (
          <NotificationRenderer {...c} key={c.id} />
        ))}
      </div>
    );
  });
  state: NotificationsState = {
    notifications: [],
  };
  private maxId = 0;

  private constructor() {
    makeObservable(this, { state: observable });
  }

  add(n: Notification) {
    const id = this.maxId++;
    this.state.notifications.push({
      ...n,
      id,
      onClose: () => {
        if (n.canClose !== false) {
          this.state.notifications = this.state.notifications.filter(
            (c) => c.id !== id,
          );
        }
      },
    });
  }
}
