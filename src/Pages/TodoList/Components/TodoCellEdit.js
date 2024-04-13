import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox, Input, Space, Button } from "antd";
import { changeComplete, changeContent } from './TodoSlice'
import { useParams, useNavigate } from 'react-router-dom';

export default function TodoCellEdit() {
    let { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const todo = useSelector(state => {
            return state.todoList.find(todo => (todo.id + "") == (id + ""))
        }
    )
    const [isComplete, setIsComplete] = useState(todo.isComplete)
    const [content, setContent] = useState(todo.content)

    if (!todo) {
         return <div>No this Todo</div>   
    }

    return (
        <Space>
            <Checkbox checked={isComplete} onChange={e => {
                setIsComplete(!isComplete)
                dispatch(changeComplete({id: todo.id}))
            }}></Checkbox>
            <Input value={content} onChange={e => {
                setContent(e.target.value)
                dispatch(changeContent({ id: todo.id, content: e.target.value }))
            }}></Input>
            <Button type='primary' onClick={e=>{
                navigate('/')
            }}>OK</Button>
        </Space>
    )
}