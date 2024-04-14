import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { 
  initTodos,
  add, 
  addAsync,
  changeContent, 
  changeComplete, 
  selectTodoList
} from './Components/TodoSlice'
import API from './../../app/API'
import './TodoList.css';
import TodoCell from './Components/TodoCell';
import { Typography, List, Input, Button, Space } from 'antd'
const { Text } = Typography


export default function TodoList() {
    useEffect(() => {
      API.get('/todoList')
      .then( response => dispatch(initTodos(response.data)) )
      .catch( error => console.log("error",error))
    }, [])

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
      dispatch(addAsync({
        content
      }))
    }
  
    const todoCells = todoList.map(todo =>
      <List.Item key={todo.id} align="center" className="list-item-center">
        <TodoCell todo={todo} onToggleIsComplate={toggleIsComplate} onChangeContent={changeTodoContent}></TodoCell>
      </List.Item>
    );
    return (
      <>
        <Space align="center">
          <Text>New Todo</Text>
          <Input value={todoInputValue} onChange={e=>{
            setTodoInputValue(e.target.value)
          }}></Input>
          <Button type='primary' onClick={e=>{
            newTodo(todoInputValue)
            setTodoInputValue('')
          }}>Add</Button>
        </Space>
        <List>
          {todoCells}
        </List>
      </>
    );
}