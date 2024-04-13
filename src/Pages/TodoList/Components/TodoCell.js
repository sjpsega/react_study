import { Checkbox, Input, Space } from "antd";
import { 
    Link
  } from 'react-router-dom'

export default function TodoCell({todo, onToggleIsComplate, onChangeContent}) {
    return (
        <Space align="center">
            <Checkbox checked={todo.isComplete} onChange={e => {
                onToggleIsComplate(todo.id)
            }}></Checkbox>
            <Input value={todo.content} onChange={e => {
                onChangeContent(todo.id, e.target.value)
            }}></Input>
            <Link to={`/todo/${todo.id}`}>Edit</Link>
        </Space>
    )
}