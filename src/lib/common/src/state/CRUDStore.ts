import { makeObservable, observable } from "mobx";
import { ScreenLocker } from "../components/ScreenLocker/ScreenLocker";

interface Controller<DataType> {
  findAll: () => Promise<DataType[]>;

  findPaged?: (offset?: number) => Promise<DataType[]>;

  delete(inst: DataType): Promise<void>;

  save(inst: DataType): Promise<void>;
}

interface CRUDStoreState<DataType> {
  data: DataType[];
  mode: "list" | "create";
  loading: number;
  page: number;
}

export class CRUDStore<DataType> {
  public state: CRUDStoreState<DataType>;

  constructor(protected controller: Controller<DataType>) {
    this.state = { data: [], loading: 0, mode: "list", page: 0 };

    makeObservable<this, "state">(this, { state: observable });

    this.refresh();
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

  async upsert(inst: Omit<DataType, "id">) {
    await this.lockingAction(async () => {
      await this.controller.save(inst as DataType);
      await this.refresh();
    });
  }

  async delete(inst: DataType) {
    await this.lockingAction(async () => {
      await this.controller.delete(inst);
      await this.refresh();
    });
  }

  async refresh() {
    this.lockingAction(async () => {
      this.state.data = await (this.controller.findPaged !== undefined
        ? this.controller.findPaged!(this.state.page)
        : this.controller.findAll());
    });
  }

  async gotoPage(page: number) {
    await this.lockingAction(async () => {
      this.state.page = page;
      await this.refresh();
    });
  }
}
