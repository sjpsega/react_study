import {createSlice} from '@reduxjs/toolkit'

export const todoSlice = createSlice(
    {
        name: "todo",
        initialState: [{
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
        }
      ],
        reducers: {
            add: (state, action) => {
                var id = 0
                const originTodoList = state
                if (originTodoList.length > 0) {
                    let lastObj = originTodoList[originTodoList.length - 1]
                    id = lastObj.id
                    id ++
                  }
                originTodoList.push({
                    id:id,
                    content: action.payload.content,
                    isComplete: false
                })
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

export const selectTodoList = state => state.todoList

export const { add, changeContent, changeComplete} = todoSlice.actions
export default todoSlice.reducer