import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
  loading: false,
  error: null
}

export const todoSlice = createSlice(
    {
        name: "todo",
        initialState: initialState,
        reducers: {
            initTodos: (state, action) => {
              state.todos = action.payload
            },
            add: {
              reducer: (state, action) => {
                state.todos.push(action.payload)
              },
              // reducer 预处理
              prepare: (content, isComplete) => {
                return {
                  payload: {
                    id: nanoid(),
                    content: content,
                    isComplete: isComplete
                  }
                }
              }
            },
            changeContent: (state, action) => {
              const target = state.todos.find(element => element.id == action.payload.id)
              if(target) {
                target.content =  action.payload.content
              }
            },
            changeComplete: (state, action) => {
              const target = state.todos.find(element => element.id == action.payload.id)
              if(target) {
                target.isComplete = !target.isComplete
              }
            }
        }
    }
)

export const addAsync = data => dispatch => {
  setTimeout(() => {
    dispatch(add(data.content, false))
  }, 1000);
}

export const selectTodoList = state => state.todoList.todos
export const selectSingleTodo = (state, id) => state.todoList.todos.find(elelment => elelment.id == id)

export const { initTodos, add, changeContent, changeComplete} = todoSlice.actions
export default todoSlice.reducer