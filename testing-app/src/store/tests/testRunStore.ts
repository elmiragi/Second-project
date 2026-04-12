import { makeAutoObservable, runInAction } from "mobx";
import type { RootStore } from "../rootStore";
import type {
  AnswerState,
  CheckResult,
  Question,
  TestItem,
} from "../../components/types/testing";
import { checkQuestion } from "../../helpers/checkQuestions";

export class testRunStore {
  test: TestItem | null = null;
  testId: number | null = null;
  testIsPublished: boolean | null = null;
  rootStore: RootStore;
  allQuestions: Question[] = [];
  answer: AnswerState = {};
  loading: boolean = true;
  error: string = "";
  showResult: boolean = false;
  timeSec: number = 0;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
  }

  get store() {
    return this.rootStore.testCatalogStore;
  }

  get durationSec(): number {
    return this.test?.durationSec ?? 600;
  }
  get filteredQuestions(): Question[] {
    if (this.testId === null) return [];
    return this.allQuestions.filter((q) => this.testId === q.testId);
  }
  get answeredCount(): number {
    return Object.values(this.answer).filter((a) => {
      if (a.type === "single") return a.value !== null;
      if (a.type === "multiple")
        return Array.isArray(a.value) && a.value.length > 0;
      if (a.type === "text")
        return typeof a.value === "string" && a.value.trim() !== "";
      return false;
    }).length;
  }

  get totalCount(): number {
    return this.allQuestions.length;
  }
  get allAnswered(): boolean {
    return this.answeredCount === this.totalCount;
  }
  get results(): CheckResult[] {
    return this.allQuestions.map((q) => checkQuestion(q, this.answer[q.id]));
  }
  get totalScore() {
    return this.results.reduce((acc, v) => acc + v.score, 0);
  }
  get maxScore() {
    return this.results.reduce((acc, v) => acc + v.max, 0);
  }
  get spentSec(): number {
    return this.durationSec - this.timeSec;
  }
  setTimeLeftSec(value: number): void {
    this.timeSec = value;
  }
  setShowResult(value: boolean) {
    this.showResult = value;
  }
  setAnswer(questionId: number, value: string | string[]) {
    const prev = this.answer[questionId];
    if (!prev) return;
    this.answer = {
      ...prev,
      [questionId]: {
        ...prev,
        value,
      },
    };
  }
  reset() {
    this.testId = null;
    this.test = null;
    this.testIsPublished = null;
    this.allQuestions = [];
    this.answer = {};
    this.loading = true;
    this.error = "";
    this.showResult = false;
    this.timeSec = 0;
  }
  async start(testId: number) {
    this.reset();
    this.testId = testId;
  }
  async loadData() {
    const tests = "/public/data/tests.json";
    const questions = "/public/data/questions.json";
// 13.5, добавить проверку вопросов
    try {
      const [testsRes, questionsRes] = await Promise.all([
        fetch(tests),
        fetch(questions),
      ]);
      if (!testsRes.ok) throw new Error(`HTTP ${testsRes.status}`);
      if (!questionsRes.ok) throw new Error(`HTTP ${questionsRes.status}`);
      const r = await testsRes.json();
      const a = await questionsRes.json();
      runInAction(() => {
        if (!Array.isArray(r) && !Array.isArray(a)) {
          throw new Error("Некорректные данные");
        }
        this.test = r;
        this.allQuestions = a;
      });
    } catch (error) {
      this.error =
        error instanceof Error ? error.message : "Неизвестная ошибка";
    } finally {
      this.loading = false;
    }
  }
}
