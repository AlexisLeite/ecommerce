import { ReactNode } from "react";
import { TFunction } from "i18next";
import { makeObservable, observable, toJS } from "mobx";
import "./GenericRetrieverModal.scss";
import { CRUDStore } from "../../../state/CRUDStore";
import {
  TResolvablePromise,
  resolvablePromise,
} from "../../../util/promise/ResolvablePromise";
import { Row } from "../../table/Row";
import { Table } from "../../table/Table";
import { TBody } from "../../table/TBody";
import { THead } from "../../table/THead";
import { ConfirmModal } from "../ConfirmModal";

export abstract class GenericRetrieverModal<
  T extends { id: any },
> extends ConfirmModal {
  selection: Set<any> = new Set();
  private promise: TResolvablePromise<T[]> | null = null;

  constructor(protected store: CRUDStore<T>) {
    super();

    makeObservable(this, { selection: observable });
  }

  protected get isConfirmEnabled(): boolean {
    return this.selection.size > 0;
  }

  onClose() {
    this.selection = new Set();
    this.promise = null;

    return super.onClose();
  }

  public open(): Promise<T[]> {
    if (this.promise) {
      throw new Error("Cannot open modal twice");
    }

    this.internalShowModal();

    this.promise = resolvablePromise();

    return this.promise.promise;
  }

  protected abstract getColumns(
    t: TFunction<"translation", undefined>,
  ): ReactNode;

  protected abstract getRowCells(
    t: TFunction<"translation", undefined>,
    element: T,
  ): ReactNode;

  protected onCancel(): Promise<boolean> {
    return Promise.resolve(true);
  }

  protected onConfirm(): Promise<boolean> {
    this.promise!.resolve(
      this.store.currentPage.data
        .filter((c) => this.selection.has(c.id))
        .map((c) => toJS(c)),
    );
    return Promise.resolve(true);
  }

  protected getModalContent(
    t: TFunction<"translation", undefined>,
  ): React.ReactNode {
    return (
      <Table variant={"secondary"}>
        <THead>
          <Row>{this.getColumns(t)}</Row>
        </THead>
        <TBody>
          {this.store.currentPage?.data.map((current) => {
            return (
              <Row
                className={
                  this.selection.has(current.id) ? "selected" : undefined
                }
                key={current.id}
                onDoubleClick={(ev) => {
                  ev.stopPropagation();
                }}
                onClick={() => {
                  if (this.selection.has(current.id)) {
                    this.selection.delete(current.id);
                  } else {
                    this.selection.add(current.id);
                  }
                }}
              >
                {this.getRowCells(t, current)}
              </Row>
            );
          })}
        </TBody>
      </Table>
    );
  }
}
