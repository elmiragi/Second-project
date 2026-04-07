import { makeObservable, action, makeAutoObservable } from "mobx";
class Counter {
  value: number = 0;

  constructor() {
    //  makeObservable(this, {
    //         increment: action,
    //         decrement: action,
    //         reset: action,
    //     })
    makeAutoObservable(this);
    this.value = 0;
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
export default Counter