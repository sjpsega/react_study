import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../Pages/TodoList/TodoSlice'

export default configureStore(
    {
        reducer: {
            todoList: todoReducer
        }
    }
)