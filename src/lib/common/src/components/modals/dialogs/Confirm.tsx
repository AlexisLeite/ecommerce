import { TFunction } from "i18next";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import "./ConfirmDialog.scss";
import { ConfirmModal } from "../ConfirmModal";
import { ModalsController } from "../ModalsController";

export type TConfirm = {
  content: ReactNode;
  title: string;
  onConfirm: () => unknown;
  onCancel: () => unknown;
};

export class Confirm extends ConfirmModal {
  constructor(private props: TConfirm) {
    super();
  }

  protected getModalContent(
    _t: TFunction<"translation", undefined>,
  ): React.ReactNode {
    return <div className={"confirm_modal_content"}>{this.props.content}</div>;
  }

  protected getModalTitle(_t: TFunction<"translation", undefined>): string {
    return this.props.title;
  }

  protected onCancel(): Promise<boolean> {
    this.props.onCancel();
    return Promise.resolve(true);
  }

  protected onConfirm(): Promise<boolean> {
    this.props.onConfirm();
    return Promise.resolve(true);
  }

  protected getFocusElement(ref: HTMLElement): HTMLElement | null {
    return ref.querySelector<HTMLElement>(".dialog__confirm");
  }
}

export function confirm(props: Pick<TConfirm, "content" | "title">) {
  return new Promise<boolean>((resolve) => {
    ModalsController.instance.append(
      new Confirm({
        ...props,
        onCancel() {
          resolve(false);
        },
        onConfirm() {
          resolve(true);
        },
      }),
    );
  });
}

export function useConfirm() {
  const { t } = useTranslation();

  return (
    props: Pick<TConfirm, "content"> & Partial<Pick<TConfirm, "title">>,
  ) => confirm({ title: t("attention"), ...props });
}
