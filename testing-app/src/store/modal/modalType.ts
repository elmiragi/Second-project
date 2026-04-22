export type ConfirmModalConfig = {
  title: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
};

export type ModalKey = "changePassword" | "confirm";

export interface ActiveModal {
  key: ModalKey | null;
  config?: ConfirmModalConfig;
}
