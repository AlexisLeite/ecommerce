import { makeObservable, observable } from "mobx";

export type TCRUDOperation<Result> = {
  success: boolean;
  result?: Result;
  error?: string;
};

export type TCRUDStorePagination<T> = {
  data: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRegisters: number;
};

export interface Controller<DataType> {
  findPaged: (
    page: number,
  ) => Promise<TCRUDOperation<TCRUDStorePagination<DataType>>>;

  delete(inst: DataType): Promise<TCRUDOperation<void>>;

  save(inst: DataType): Promise<TCRUDOperation<DataType>>;
}

export type TCRUDStoreState<DataType> = TCRUDStorePagination<DataType> & {
  loading: number;
};

export class CRUDStore<DataType> {
  public state: TCRUDStoreState<DataType>;

  constructor(protected controller: Controller<DataType>) {
    this.state = {
      loading: 0,
      currentPage: 1,
      data: [],
      pageSize: 1,
      totalPages: 1,
      totalRegisters: 1,
    };

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

  async upsert(inst: Omit<DataType, "id">) {
    await this.asyncAction(async () => {
      await this.controller.save(inst as DataType);
      await this.refresh();
    });
  }

  async delete(inst: DataType) {
    await this.asyncAction(async () => {
      await this.controller.delete(inst);
      await this.refresh();
    });
  }

  async refresh() {
    this.asyncAction(async () => {
      const result = await this.controller.findPaged(this.state.currentPage);
      if (result.success) {
        Object.assign(this.state, result.result!);
      } else {
        throw result.error;
      }
    });
  }

  async gotoPage(page: number) {
    await this.asyncAction(async () => {
      this.state.currentPage = page;
      await this.refresh();
    });
  }
}
