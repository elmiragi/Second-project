import { makeAutoObservable } from "mobx";
import type { RootStore } from "../rootStore";

export class StudentTestPageVM {    
    rootStore: RootStore;
    constructor(rootStore: RootStore | null) {
    makeAutoObservable(this, {}, { autoBind: true })
    this.rootStore = rootStore!;}
    init() {
        this.store().load();
    }
    store() {
        return this.rootStore.testCatalogStore;
    }
    onFilterChange(filter: any) {
        this.store().setFilters(filter);
    }
    
    get loading() {
        return this.store().loading;
    }
    get error() {
        return this.store().error;
    }
    get visibleTests() {
        return this.store().visibleTests;
    }
    get lastAttemptByTest() {
        return this.store().lastAttemptByTest;
    }

}