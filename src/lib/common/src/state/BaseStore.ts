import { makeObservable, observable } from "mobx";
import { ScreenLocker } from "../components/ScreenLocker/ScreenLocker";

export class BaseStore<T extends Record<string, any>> {
  public state: T & { loading: number };

  constructor(initialState: Omit<T, "loading">) {
    this.state = { ...initialState, loading: 0 } as T & { loading: number };
    makeObservable<this, "state">(this, { state: observable });
  }

  get isLoading() {
    return this.state.loading > 0;
  }

  async asyncAction<T>(cb: () => Promise<T>): Promise<T> {
    this.state.loading++;
    try {
      return await cb();
    } finally {
      this.state.loading--;
    }
  }

  async lockingAction<T>(cb: () => Promise<T>): Promise<T> {
    const unlock = ScreenLocker.instance.lock();
    try {
      return await cb();
    } finally {
      unlock();
    }
  }
}
