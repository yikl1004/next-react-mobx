import { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";


@inject('counter')
@observer
class Counter extends Component {
  render() {
    const { number, increase, decrease } = this.props.counter;
    return (
      <Fragment>
        <h1>{number}</h1>
        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>
      </Fragment>
    );
  }
}

export default Counter;
