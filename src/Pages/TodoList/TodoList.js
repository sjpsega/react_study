import { useState, useReducer } from 'react';
import TodoCell from './Components/TodoCell';
import GlobalData from '../../Common/GlobalData';
import todoReducer from './Reducer/TodoReducer'
import { Typography, List, Input, Button, Space } from 'antd'
const { Title, Text } = Typography;

const initialTodoListData = [{
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
                      }];

export default function TodoList() {
    const [todos, dispatch] = useReducer(todoReducer, initialTodoListData)
    const [todoInputValue, setTodoInputValue] = useState('')
  
    function toggleIsComplate(id) {
      dispatch({
        type: GlobalData.Event.TodoList.ChangeComplate,
        id: id
      })
    }
  
    function changeContent(id, content) {
      dispatch({
        type: GlobalData.Event.TodoList.ChangeContent,
        id: id,
        content: content
      })
    }
  
    function newTodo(content) {
      if (content.length == 0) {
        return 
      }
      dispatch({
        type: GlobalData.Event.TodoList.Add,
        content: content
      })
    }
  
    const todoCells = todos.map(todo =>
      <List.Item key={todo.id}>
        <TodoCell todo={todo} onToggleIsComplate={toggleIsComplate} onChangeContent={changeContent}></TodoCell>
      </List.Item>
    );
    return (
      <div className="App">
        <Title>TodoList</Title>
        <Space align="center">
          <Text>New Todo</Text>
          <Input value={todoInputValue} onChange={e=>{
            setTodoInputValue(e.target.value)
          }}></Input>
          <Button onClick={e=>{
            newTodo(todoInputValue)
            setTodoInputValue('')
          }}>Add</Button>
        </Space>
        <List>
          {todoCells}
        </List>
      </div>
    );
}