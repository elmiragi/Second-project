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

    async load() {
    const tests='/public/data/tests.json';
    const attempts='/public/data/attempts.json';
    this.tests = [];
    this.attempts = [];
    this.loading = true;

    try {
    const [testsRes, attemptsRes] =  await Promise.all([
      fetch(tests),
      fetch(attempts)])
        // .then( ([res1, res2]) => {
            if (!testsRes.ok) throw new Error(`HTTP ${testsRes.status}`);
            if (!attemptsRes.ok) throw new Error(`HTTP ${attemptsRes.status}`);
            const r =  await testsRes.json();
            const a =  await attemptsRes.json();
            runInAction(() => {
                if (!Array.isArray(r) && !Array.isArray(a)) {
                    throw new Error("Некорректные данные");
                }                
                    this.tests = r;
                    this.attempts = a;
            });
        }catch(error) {
            this.error = error instanceof Error ? error.message : "Неизвестная ошибка";
        }finally{
            this.loading=false}
    
        
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