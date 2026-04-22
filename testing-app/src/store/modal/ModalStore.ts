import { makeAutoObservable } from "mobx";
import type { ConfirmModalConfig, ModalKey } from "./modalType";

export class ModalStore {
  active: ModalKey | null = null;
  confirm: ConfirmModalConfig | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openConfirm(config: ConfirmModalConfig) {
    this.confirm = config;
    this.active = "confirm";
  }

  open(key: Exclude<ModalKey, "confirm">) {
    this.active = key;
  }

  close() {
    this.active = null;
    this.confirm = null;
  }

  get isConfirmOpen() {
    return this.active === "confirm" && this.confirm !== null;
  }

  get isChangePasswordOpen() {
    return this.active === "changePassword";
  }
}
