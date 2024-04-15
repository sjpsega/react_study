import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import API from '../../app/API'
import { StatusEnum } from '../../app/consts'

const initialState = {
  todos: [],
  status: StatusEnum.IDLE,
  error: null
}

export const todoSlice = createSlice(
    {
        name: "todo",
        initialState: initialState,
        reducers: {
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
        },
        extraReducers(builder) {
          builder
          .addCase(fetchTodoList.pending, (state, action) => {
            state.status = StatusEnum.LOADING
          })
          .addCase(fetchTodoList.fulfilled, (state, action) => {
            state.status = StatusEnum.SUCCEEDED
            // @SEE: https://zh-hans.react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
            // @FIXME: 这里做了简单处理，直接把返回结果设置为默认数据。防止首次渲染重复两次，导致数据重复
            // state.todos = state.todos.concat(action.payload)
            state.todos = action.payload
          })
          .addCase(fetchTodoList.rejected, (state, action) => {
            state.status = StatusEnum.FAILED
            state.error = action.error.message
          })
          .addCase(addTodoAsync.fulfilled, (state, action) => {
            state.todos.push(action.payload)
          })
        }
    }
)

export const fetchTodoList = createAsyncThunk('/todoList', async () => {
  const response = await API.get('/todoList')
  return response.data
})

export const addTodoAsync = createAsyncThunk('/addTodo', async todoData => {
  const response = await API.post('/addTodo', todoData)
  return response.data
})

export const selectTodoList = state => state.todoList.todos
export const selectSingleTodo = (state, id) => state.todoList.todos.find(elelment => elelment.id == id)
export const selectTodoStatus = state => state.todoList.status

export const { changeContent, changeComplete } = todoSlice.actions
export default todoSlice.reducer