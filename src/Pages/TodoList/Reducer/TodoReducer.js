// @SEE: fix Array bug：https://zh-hans.react.dev/learn/updating-arrays-in-state
export default function TodoReducer(todos, action) {
    switch(action.type) {
        case 'add': {
            var id = 1;
            const cloneTodoListData = [...todos]
            if (cloneTodoListData.length > 0) {
              let lastObj = cloneTodoListData[cloneTodoListData.length - 1]
              id = lastObj.id
              id ++
            }
            cloneTodoListData.push({
              id:id,
              content: action.content,
              isComplete: false
            })
            console.log('add:', cloneTodoListData.length)
            return cloneTodoListData
        }
        case 'changeContent': {
            return todos.map(todo=> {
                if (todo.id === action.id ) {
                    return  {...todo, content:action.content }
                } else {
                    return todo
                }
            })
        }
        case 'changeComplate': {
            return todos.map(todo=> {
                if (todo.id === action.id ) {
                    return  {...todo, isComplete:!todo.isComplete }
                } else {
                    return todo
                }
            })
        }
    }
}