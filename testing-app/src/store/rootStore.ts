import type { StudentTestPageVM } from "./tests/studentTestPageVM";
import type { TestCatalogStore } from "./tests/testCatalogStore";
import testCatalogStore from "./tests/testCatalogStore";
import { Counter, testRunStore } from "./tests/testRunStore";

export class RootStore {
    counter: Counter;
    testRunStore: testRunStore;
    testCatalogStore: TestCatalogStore;

    constructor() {
        this.counter = new Counter();
        this.testRunStore = new testRunStore();
        this.testCatalogStore = new testCatalogStore();
    }
};
export const rootStore = new RootStore();