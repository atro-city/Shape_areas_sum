import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

interface Rectangle {
  kind: "Rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "Circle";
  radius: number;
}
interface Triangle {
  kind: "Triangle";
  height: number;
  width: number;
}
type Shape = Circle | Rectangle | Triangle;

function areaSumSum(a: Shape, b: Shape) {
  return area(a) + area(b);
}

function areaSum(...args) {
  return args.reduce((prev, curr) => {
    if (typeof prev != "number") return area(prev) + area(curr);
    else return prev + area(curr);
  });
}

function area(s: Shape) {
  switch (s.kind) {
    case "Circle":
      return Math.PI * s.radius ** 2;
    case "Rectangle":
      return s.height * s.width;
    case "Triangle":
      return (s.height * s.width) / 2;
  }
}

let triangle: Shape = { kind: "Triangle", width: 0, height: 0 };
let circle: Shape = { kind: "Circle", radius: 0 };
let rectangle: Shape = { kind: "Rectangle", width: 0, height: 0 };

class AreaCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triangle: triangle,
      circle: circle,
      rectangle: rectangle
    };
  }

  stateUpdate = (value: number, param: String) => {
    switch (param) {
      case "inputCircleRadius":
        this.setState(prevState => ({
          circle: {
            ...prevState.circle,
            radius: value
          }
        }));
        break;
      case "inputRectangleHeight":
        this.setState(prevState => ({
          rectangle: {
            ...prevState.rectangle,
            height: value
          }
        }));
        break;
      case "inputRectangleWidth":
        this.setState(prevState => ({
          rectangle: {
            ...prevState.rectangle,
            width: value
          }
        }));
        break;
      case "inputTriangleHeight":
        this.setState(prevState => ({
          triangle: {
            ...prevState.triangle,
            height: value
          }
        }));
        break;
      case "inputTriangleWidth":
        this.setState(prevState => ({
          triangle: {
            ...prevState.triangle,
            width: value
          }
        }));
        break;
    }
  };

  render() {
    return (
      <div>
        <div>
          Circle:
          <input
            id="inputCircleRadius"
            onChange={ev =>
              this.stateUpdate(
                Number(ev.currentTarget.value),
                ev.currentTarget.id
              )
            }
          />
        </div>
        <div>
          Rectangle:
          <input
            id="inputRectangleHeight"
            onChange={ev =>
              this.stateUpdate(
                Number(ev.currentTarget.value),
                ev.currentTarget.id
              )
            }
          />
          <input
            id="inputRectangleWidth"
            onChange={ev =>
              this.stateUpdate(
                Number(ev.currentTarget.value),
                ev.currentTarget.id
              )
            }
          />
        </div>
        <div>
          Triangle:
          <input
            id="inputTriangleHeight"
            onChange={ev =>
              this.stateUpdate(
                Number(ev.currentTarget.value),
                ev.currentTarget.id
              )
            }
          />
          <input
            id="inputTriangleWidth"
            onChange={ev =>
              this.stateUpdate(
                Number(ev.currentTarget.value),
                ev.currentTarget.id
              )
            }
          />
        </div>
        Sum of areas ={" "}
        {areaSum(this.state.triangle, this.state.rectangle, this.state.circle)}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <AreaCounter />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
