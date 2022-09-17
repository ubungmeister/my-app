import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Todolist} from "../App";
import {v1} from "uuid";


export type UpdateTaskType = {
    id: string
    text: string
}
type InitialState = {
    todo: Array<Todolist>
}
const initialState: InitialState = {
    todo: []
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.todo.push({
                id: v1(),
                text: action.payload,
                completed: false
            })
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.todo = state.todo.filter(el => el.id !== action.payload)
        },
        toggleTodo(state, action: PayloadAction<string>) {
            state.todo = state.todo.map(el => el.id === action.payload ? {...el, completed: !el.completed} : el)
        },
        changeTask(state, action: PayloadAction<UpdateTaskType>) {
            state.todo = state.todo.map(el => el.id === action.payload.id ? {...el, text: action.payload.text} : el)
        }
    }
})

// export type addTodoType = ReturnType<typeof addTodo>

export const {addTodo, removeTodo, toggleTodo, changeTask} = todoSlice.actions;
export default todoSlice.reducer