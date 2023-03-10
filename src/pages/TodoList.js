import React, {useEffect, useState} from "react";

function TodoList() {
    const [todoList, setTodoList] = useState(null);

    const fetchData = () => {
        fetch('http://localhost:8080/api/todo')
            .then((res) => res.json())
            .then((data) => setTodoList(data));
    }

//처음 컴포넌트 렌더링 될 때만 실행되도록 하기
    useEffect(() => {
        fetchData();
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        const done = e.target.text.checked;
        fetch('http://localhost:8080/api/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                done,
            })
        })
    }

    return (
        <div>
            <h1>TodoList</h1>
            <form onSubmit={onSubmitHandler}>
                <input name="text"/>
                <input name="done" type="checkbox"/>
                <input type="submit" value="추가"/>
            </form>
            {todoList?.map((todo) => (
                <div key={todo.id} style={{display: "flex"}}> {/*map 을 돌리니까 key 값이 필요!*/}
                    <div>{todo.id}</div>
                    <div>{todo.text}</div>
                    <div>{todo.done ? 'Y' : 'N'}</div>
                </div>
            ))}
        </div>
    )
}

export default TodoList;