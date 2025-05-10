import { makeAutoObservable, observable, runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import "./ScreenLocker.css";
import { LinearLoader } from "./LinearLoader";

export class ScreenLocker {
  public static readonly instance = new ScreenLocker();
  static Provider = observer(() => {
    const { t } = useTranslation();

    if (!this.instance.state.locks && !this.instance.state.forced) return null;

    return (
      <div
        className={"screenLocker"}
        role={"dialog"}
        aria-label={t("waitAMoment")}
      >
        <LinearLoader className={"screenLocker__linear"} />
      </div>
    );
  });
  private state = {
    locks: 0,
    forced: false,
  };

  constructor() {
    makeAutoObservable<ScreenLocker, "state">(this, { state: observable });
  }

  force() {
    this.state.forced = true;

    return () => {
      runInAction(() => {
        this.state.forced = false;
      });
    };
  }

  lock() {
    this.state.locks++;

    return () => {
      runInAction(() => {
        this.state.locks = Math.max(0, this.state.locks - 1);
      });
    };
  }

  unlock() {
    this.state.locks--;
  }
}
