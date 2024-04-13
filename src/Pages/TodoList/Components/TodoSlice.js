import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [{
  id:1,
  content: 'Hedy Lamarr',
  isComplete: false
},
{
  id:2,
  content: 'Hedy Lamarr2',
  isComplete: false
},
{
  id:3,
  content: 'Hedy Lamarr3',
  isComplete: true
}]

export const todoSlice = createSlice(
    {
        name: "todo",
        initialState: initialState,
        reducers: {
            add: {
              reducer: (state, action) => {
                state.push(action.payload)
              },
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
              const target = state.find(element => element.id == action.payload.id)
              if(target) {
                target.content =  action.payload.content
              }
            },
            changeComplete: (state, action) => {
              const target = state.find(element => element.id == action.payload.id)
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

export const selectTodoList = state => state.todoList

export const { add, changeContent, changeComplete} = todoSlice.actions
export default todoSlice.reducer