import React from "react";
import ReactDOM from "react-dom";

function Counter() {
    const [count, setCount] = useState(0);

    const [name, setName] = useState('xcharset')

    const onClick = () => {
        setCount(count + 1)
    }

    const onClickName = () => {
        setName(`${name} ${Math.random()}`)
    }

    return (
        <div>
            <div>{count}</div>
            <button onClick={onClick}>按钮</button>
            <div>{name}</div>
            <button onClick={onClickName}>修改名称</button>
        </div>
    )
}

let stateArray: any[] = [];
let cursor = 0;
function useState<T>(initialState: T): [T, (newState: T) => void] {

    const currentCursor = cursor;

    stateArray[currentCursor] = stateArray[currentCursor] || initialState;


    function setState(newState: T) {
        stateArray[currentCursor] = newState;
        console.log(stateArray);
        render();
    }

    ++cursor;

    return [stateArray[currentCursor], setState];
}

export function render() {
    ReactDOM.render(
        <React.StrictMode>
          <Counter />
        </React.StrictMode>,
        document.getElementById('root')
    );
    // TODO
    cursor = 0;
}