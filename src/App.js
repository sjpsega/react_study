import './App.css';
import { useState } from 'react';
import TodoCell from './Components/TodoCell';
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

function App() {
  const [todoListData, setTodoListData] = useState(initialTodoListData)
  const [todoInputValue, setTodoInputValue] = useState('')

  function toggleIsComplate(id) {
    const cloneTodoListData = [...todoListData]
    const targetTodo = cloneTodoListData.find(todo=>
      todo.id === id)
      targetTodo.isComplete = !targetTodo.isComplete
    setTodoListData(cloneTodoListData)
  }

  function changeContent(id, content) {
    const cloneTodoListData = [...todoListData]
    const targetTodo = cloneTodoListData.find(todo=>
      todo.id === id)
      targetTodo.content = content
    setTodoListData(cloneTodoListData)
  }

  function newTodo(content) {
    if (content.length == 0) {
      return 
    }
    var id = 1;
    const cloneTodoListData = [...todoListData]
    if (cloneTodoListData.length > 0) {
      let lastObj = cloneTodoListData[cloneTodoListData.length - 1]
      id = lastObj.id
      id ++
    }
    cloneTodoListData.push({
      id:id,
      content: content,
      isComplete: false
    })
    setTodoListData(cloneTodoListData)
  }

  const todoCells = todoListData.map(todo =>
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

export default App;
