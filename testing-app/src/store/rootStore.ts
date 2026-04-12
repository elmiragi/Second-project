
import type { TestCatalogStore } from "./tests/testCatalogStore";
import testCatalogStore from "./tests/testCatalogStore";
import { testRunStore } from "./tests/testRunStore";

export class RootStore {
    testRunStore: testRunStore;
    testCatalogStore: TestCatalogStore;

    constructor() {
        this.testRunStore = new testRunStore(this);
        this.testCatalogStore = new testCatalogStore();
    }
};
export const rootStore = new RootStore();