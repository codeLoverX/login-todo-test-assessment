import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { useCallback, useMemo, useState } from 'react';
import { axiosFetch } from '../../api/fetch';
import Layout from '@/components/layout/Layout';

export default function Home({ _todoList }) {
    const [todoList, setTodoList] = useState(_todoList);
    console.log({ todoList })
    const [currentTodoIndex, setCurrentTodoIndex] = useState(-1);
    const mode = currentTodoIndex === -1 ? "ADD" : "EDIT";
    const handleCurrentTodoIndex = (index) => {
        console.log({ index });
        setCurrentTodoIndex(index);
    }
    const handleCurrentTodo = () => {
        if (currentTodoIndex < 0) return { _id: 0, title: "", description: "", date: "" }
        else return todoList[currentTodoIndex]
    }
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
        <Layout>
            <main
                className={`min-h-screen font-primary`}
            >
                <div className="px-6 md:px-24 2xl:px-96">
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
                        editTodo={editTodo}
                    />
                </div>
            </main>
        </Layout>
    ))
}

export async function getStaticProps() {
    const todoList = (await axiosFetch.get("/todo")).data.data
    // const _todoList = await todoList.text()

    // console.log(_todoList)
    return {
        props: {
            _todoList: todoList
        },

    }
}