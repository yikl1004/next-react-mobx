import { observable, action } from "mobx";
// import autobind from "autobind-decorator";

export default class Counter {
  @observable number = 0;

  @action increase = () => {
    this.number += 1;
  };

  @action decrease = () => {
    this.number -= 1;
  };
}
