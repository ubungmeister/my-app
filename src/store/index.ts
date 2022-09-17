
import todoSlice from "./todoSlice";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        todos: todoSlice
    }
})
export default store
export type AppRootStateType = ReturnType<typeof store.getState>
export  type AppDispatch = typeof store.dispatch