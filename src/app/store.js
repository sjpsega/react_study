import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../Pages/TodoList/Components/TodoSlice'

export default configureStore(
    {
        reducer: {
            todoList: todoReducer
        }
    }
)