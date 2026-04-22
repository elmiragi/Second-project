import { makeAutoObservable } from "mobx";
import type { RootStore } from "../rootStore";
import type { NavigateFunction } from "react-router-dom";

export class TestRunPageVM {
  rootStore: RootStore;
  constructor(rootStore: RootStore | null) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore!;
  }

  get store() {
    return this.rootStore.testRunStore;
  }

  get modalStore() {
    return this.rootStore.modalStore;
  }
  get finishModalText(): string {
    return this.store.allAnswered
      ? "Вы точно хотите завершить тест?"
      : `Не все задания выполнены (${this.store.answeredCount}/${this.store.totalCount}), Вы точно хотите завершить?`;
  }

  // closeFinishModal() {
  //   this.finishModal = false;
  // }
  // openFinishModal() {
  //   if (this.store.showResult) return;
  //   this.finishModal = true;
  // }
  init(testId?: number) {
    this.store.loadData(testId);
  }

  requestFinish(navigate: NavigateFunction) {
    if (this.store.showResult) return;

    this.modalStore.openConfirm({
      title: this.finishModalText,
      confirmLabel: "Завершить",
      cancelLabel: "Продолжить",
      onConfirm: () => this.confirmFinish(navigate),
    });
  }

  confirmFinish(navigate: NavigateFunction) {
    // this.closeFinishModal();
    this.submit(navigate);
  }
  timerFinish(navigate: NavigateFunction) {
    this.submit(navigate);
  }
  submit(navigate: NavigateFunction) {
    const test = this.store.test;
    const testId = this.store.testId;
    const spentSeconds = this.store.spentSec;
    this.store.setShowResult(true);
    if (test == null) return;

    if (!test.allowRetry) {
      return;
    }

    const attemptsLeft =
      test.attemptsAllowed > 1 ? test.attemptsAllowed - 1 : 0;

    navigate(`/student/test/${testId}/result`, {
      replace: true,
      state: {
        max: this.store.maxScore,
        score: this.store.totalScore,
        attempts: attemptsLeft,
        time: spentSeconds,
        finish: this.store.showResult,
      },
    });
  }
}
