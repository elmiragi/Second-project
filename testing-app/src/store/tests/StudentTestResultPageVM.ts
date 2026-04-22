import { makeAutoObservable } from "mobx";
import type { NavigateFunction } from "react-router";
import type { StudentTestResultState } from "../../components/types/TestResultStates";
import type { RootStore } from "../rootStore";

export class StudentTestResultPageVM {
  testId: string = "";
  rootStore: RootStore;
  max: number | null = null;
  score: number | null = null;
  time: number | null = null;
  attempts: number | null = null;
  flagState = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get showAttempts() {
    return typeof this.attempts === "number";
  }
  get allowRetry() {
    return this.attempts !== 0;
  }

  init(testId: string | undefined, state: StudentTestResultState) {
    if (!state) {
      this.flagState = false;
      return;
    }
    this.testId = testId ?? "";
    this.flagState = true;
    this.score = state.score;
    this.max = state.max;
    this.time = state.time;
    this.attempts = state.attempts;
  }
  redirectMainState(navigate: NavigateFunction) {
    if (this.flagState) return;
    navigate("/student/tests", { replace: true });
  }
  goRetry(navigate: NavigateFunction) {
    if (!this.testId) return;
    navigate(`/student/test/${this.testId}`, { replace: true });
  }

  get showAttemptsBox() {
    return typeof this.attempts === "number";
  }
  get canRetry() {
    return this.attempts !== 0;
  }
}
