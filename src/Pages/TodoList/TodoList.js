import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { 
  add, 
  addTodoAsync,
  changeContent, 
  changeComplete, 
  selectTodoList,
  selectTodoStatus,
  fetchTodoList
} from './TodoSlice'
import API from './../../app/API'
import { StatusEnum } from '../../app/consts'
import './TodoList.css';
import TodoCell from './Components/TodoCell';
import { Typography, List, Input, Button, Space, Spin } from 'antd'
const { Text } = Typography


export default function TodoList() {
    const todoList = useSelector(selectTodoList)
    const todoStatus = useSelector(selectTodoStatus)
    const dispatch = useDispatch()

    useEffect(() => {
      if (todoStatus == StatusEnum.IDLE) {
        dispatch(fetchTodoList())
      }
    }, [todoStatus, dispatch])

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
      dispatch(addTodoAsync({
        content,
        isComplete: false
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
        <Spin spinning={ todoStatus == StatusEnum.LOADING ? true : false}>
          <List>
            {todoCells}
          </List>
        </Spin>
      </>
    );
}