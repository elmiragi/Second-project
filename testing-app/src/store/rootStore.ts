
import type { TestCatalogStore } from "./tests/testCatalogStore";
import testCatalogStore from "./tests/testCatalogStore";
import { testRunStore } from "./tests/testRunStore";
import { ModalStore } from "./modal/ModalStore";

export class RootStore {
    testRunStore: testRunStore;
    testCatalogStore: TestCatalogStore;
    modalStore: ModalStore;

    constructor() {
        this.testRunStore = new testRunStore(this);
        this.testCatalogStore = new testCatalogStore();
        this.modalStore = new ModalStore();
    }
};
export const rootStore = new RootStore();