import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { add, 
  changeContent, 
  changeComplete, 
  selectTodoList
} from './Components/TodoSlice'
import TodoCell from './Components/TodoCell';
import { Typography, List, Input, Button, Space } from 'antd'
const { Title, Text } = Typography;

export default function TodoList() {
    const todoList = useSelector(selectTodoList)
    const dispatch = useDispatch()
    const [todoInputValue, setTodoInputValue] = useState('')
  
    function toggleIsComplate(id) {
      dispatch(changeComplete({
        id
      }))
    }
  
    function changeTodoContent(id, content) {
      dispatch(changeContent({
        id,
        content
      }))
    }
  
    function newTodo(content) {
      if (content.length == 0) {
        return 
      }
      dispatch(add({
        content
      }))
    }
  
    const todoCells = todoList.map(todo =>
      <List.Item key={todo.id}>
        <TodoCell todo={todo} onToggleIsComplate={toggleIsComplate} onChangeContent={changeTodoContent}></TodoCell>
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