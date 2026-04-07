import { makeAutoObservable } from "mobx";

export class testRunStore {
    title: string = "Test Run Store";
     constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

}
export class Counter {
  value: number = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    // без autoBind: деструктуризацтя не работает, так как методы не привязаны к классу
  }

//   action
  increment() {
    this.value++;
  }

  decrement() {    
    this.value--;
  }

  reset() {
    this.value=0;
  }
}