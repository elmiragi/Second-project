import { makeAutoObservable, runInAction } from "mobx";
import type { TestItem, Attempt } from "../../components/types/testing";

export type TestFilters = {
  project?: string;
  track?: string;
  durationSec?: number;
  tags?: string[];
  isPublished?: boolean;
  search?: string;
};

// export type TestUIState = {
//   loading: boolean;
//   error: string | null;
// };

export class TestCatalogStore {
  
  tests: TestItem[] = [];
  attempts: Attempt[] = [];
  loading: boolean = false;
  error: string | null = null;
  userId: number = 1;
  filter: TestFilters = {};

  constructor() {
    makeAutoObservable(this, {}, {
      autoBind: true
    });
  }

  setFilters(filter: TestFilters): void {
    this.filter = { ...filter };
}
//       setFilters(t):  {void {
//     this.filter = t;

//   }

  load(): void {
    const tests='/public/data/tests.json';
    const attempts='/public/data/attempts.json';
    this.tests = [];
    this.attempts = [];
    Promise.all([
      fetch(tests),
      fetch(attempts)])
        .then(async ([res1, res2]) => {
            this.loading = true;
            if (!res1.ok) throw new Error(`HTTP ${res1.status}`);
            if (!res2.ok) throw new Error(`HTTP ${res2.status}`);
            const r = await res1.json();
            const a = await res2.json();
            runInAction(() => {
                // if (!Array.isArray(r) && !Array.isArray(a)) {
                if (!Array.isArray(r) && !Array.isArray(a)) {
                    throw new Error("Некорректные данные");
                }                
                    this.tests = r;
                    this.attempts = a;
            });
        })
        .catch(err => {
            this.error= err.message;
            this.loading = false;
        })
        .finally(() => (this.loading=false))
  }
get lastAttemptByTest() {
    const unique = new Map();
    const mine = this.attempts.filter((a) => a.userId === this.userId);
    for (const element of mine) unique.set(element.userId, element);
    return unique;
}
get visibleTests() {
    return this.tests.filter((t) => t.isPublished);
}}

export default TestCatalogStore;