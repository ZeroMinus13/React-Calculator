import { useState } from 'react';

function App() {
  const [display, setDisplay] = useState('');
  const [smallDisplay, setSmallDisplay] = useState('');
  const [num, setNum] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState(null);
  const [operatorPressed, setOperatorPressed] = useState(false);
  const [dotpress, setDotPress] = useState({ num: false, num2: false });

  const add = (a, b) => Number(a) + Number(b);
  const subtract = (a, b) => Number(a) - Number(b);
  const multiply = (a, b) => a * b;
  const divide = (a, b) => a / b;

  function logicnDisplay(e) {
    let { className, innerText } = e.target;

    if (!operator && className == 'numbers') {
      setDisplay((prev) => prev + innerText);
      setNum((prev) => prev + innerText);
    } else if (className == 'numbers') {
      setNum2((prev) => prev + innerText);
    } else if (className == 'dot' && !dotpress.num2) {
      setDotPress((prev) => ({ ...prev, num2: true }));
      setNum2((prev) => prev + innerText);
    }

    if (className == 'operator') {
      if (!operatorPressed) {
        setSmallDisplay((prev) => `${prev} ${innerText}`);
        setOperator(innerText);
        setOperatorPressed(true);
      }
    } else if (className !== 'dot') {
      setSmallDisplay((prev) => `${prev} ${innerText}`);
    }

    if (className == 'dot' && !dotpress.num) {
      setDotPress((prev) => ({ ...prev, num: true }));
      setDisplay((prev) => prev + innerText);
      setNum((prev) => prev + innerText);
      setSmallDisplay((prev) => `${prev} ${innerText}`);
    }
  }

  function operation() {
    let result = 0;
    switch (operator) {
      case '+':
        result = add(num, num2);
        break;
      case '-':
        result = subtract(num, num2);
        break;
      case '*':
        result = Math.round(multiply(num, num2) * 100) / 100;
        break;
      case '/':
        result = divide(num, num2).toFixed(2);
        break;
    }
    if (!result.toString().includes('.')) {
      setDotPress({ num: false, num2: false });
    }
    setDisplay(result);
    setSmallDisplay((prev) => `${prev} ${result}`);
    setNum(result);
    setNum2(0);
    setOperator(null);
    setOperatorPressed(false);
  }

  function clearAll() {
    operation();
    setDisplay('');
    setSmallDisplay('');
  }
  return (
    <div className="App">
      <input type="text" className="screen2" disabled placeholder="0" value={smallDisplay} />
      <input type="text" className="screen" disabled placeholder="0" value={display} />
      <button className="operator" onClick={(e) => logicnDisplay(e)}>
        -
      </button>
      <button className="operator" onClick={(e) => logicnDisplay(e)}>
        +
      </button>
      <button className="operator" onClick={(e) => logicnDisplay(e)}>
        *
      </button>
      <button className="operator" onClick={(e) => logicnDisplay(e)}>
        /
      </button>
      <button className="dot" onClick={(e) => logicnDisplay(e)}>
        .
      </button>
      <button className="numbers" onClick={(e) => logicnDisplay(e)}>
        0
      </button>
      <button className="numbers" onClick={(e) => logicnDisplay(e)}>
        1
      </button>
      <button className="numbers" onClick={(e) => logicnDisplay(e)}>
        2
      </button>
      <button className="numbers" onClick={(e) => logicnDisplay(e)}>
        3
      </button>
      <button className="numbers" onClick={(e) => logicnDisplay(e)}>
        4
      </button>
      <button className="numbers" onClick={(e) => logicnDisplay(e)}>
        5
      </button>
      <button className="numbers" onClick={(e) => logicnDisplay(e)}>
        6
      </button>
      <button className="numbers" onClick={(e) => logicnDisplay(e)}>
        7
      </button>
      <button className="numbers" onClick={(e) => logicnDisplay(e)}>
        8
      </button>
      <button className="numbers" onClick={(e) => logicnDisplay(e)}>
        9
      </button>

      <button
        className="equal"
        onClick={(e) => {
          logicnDisplay(e), operation();
        }}
      >
        =
      </button>
      <button className="clear" onClick={() => clearAll()}>
        C
      </button>
    </div>
  );
}

export default App;
