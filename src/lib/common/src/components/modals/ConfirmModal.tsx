import { TFunction } from "i18next";
import { BaseModal } from "./BaseModal";
import { Button } from "../form/Button";

export abstract class ConfirmModal extends BaseModal {
  protected get canCancel() {
    return true;
  }

  protected get isConfirmEnabled() {
    return true;
  }

  protected abstract onCancel(): Promise<boolean>;

  protected abstract onConfirm(): Promise<boolean>;

  protected getModalFooter(
    close: () => void,
    t: TFunction<"translation", undefined>,
  ): React.ReactNode {
    return (
      <div className={"modal_actions"}>
        {this.canCancel && (
          <Button
            className={"dialog__cancel"}
            size={"sm"}
            variant={"outline"}
            onClick={() =>
              this.onCancel().then((canClose) => {
                if (canClose) {
                  close();
                }
              })
            }
          >
            {t("cancel")}
          </Button>
        )}
        <Button
          className={"dialog__confirm"}
          size={"sm"}
          disabled={!this.isConfirmEnabled}
          onClick={() =>
            this.onConfirm().then((canClose) => {
              if (canClose) {
                close();
              }
            })
          }
        >
          {t("confirm")}
        </Button>
      </div>
    );
  }
}
