import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { useCallback, useMemo, useState } from 'react';

export default function Home({ _todoList }) {
    const [todoList, setTodoList] = useState(_todoList);
    const [currentTodoIndex, setCurrentTodoIndex] = useState(-1);
    const mode =  currentTodoIndex === -1 ? "ADD" : "EDIT";
    const handleCurrentTodoIndex= (index)=> {
        console.log({index});
        setCurrentTodoIndex(index);
    }
    const handleCurrentTodo = () => {
        if (currentTodoIndex < 0) return { _id: 0, title: "", desc: "", date: "" }
        else return todoList[currentTodoIndex]
    }
    // console.log({ todoList, currentTodoIndex })
    const addTodo = (todo) => {
        setTodoList((prev) => [...prev, todo])
    }
    const editTodo = (todo) => {
        setTodoList(todoList.map((element) =>
            element._id === todo._id ? todo : element
        ))
    }
    const removeTodo = (id) => {
        setTodoList(todoList.filter((element) =>
        element._id !== id
        ))
    }
    return useMemo(() => (
        <main
            className={`min-h-screen font-primary`}
        >
            <div className="px-96">
                <TodoForm currentTodo={{ ...handleCurrentTodo() }}
                    mode={mode}
                    handleCurrentTodoIndex={handleCurrentTodoIndex}
                    addTodo={addTodo}
                    editTodo={editTodo}
                />
                <TodoList
                    todoList={todoList}
                    handleCurrentTodoIndex={handleCurrentTodoIndex}
                    removeTodo={removeTodo}
                />
            </div>
        </main>
    ))
}

export async function getStaticProps() {
    const todoList = [
        { _id: 1, title: "HI1", desc: "no", date: "sss" },
        { _id: 2, title: "HI2", desc: "no", date: "sss" },
        { _id: 3, title: "HI3", desc: "no", date: "sss" }
    ];
    return {
        props: {
            _todoList: todoList
        },

    }
}