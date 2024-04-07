import { Checkbox, Input, Space } from "antd";

export default function TodoCell({todo, onToggleIsComplate, onChangeContent}) {
    return (
        <Space>
            <Checkbox checked={todo.isComplete} onChange={e => {
                onToggleIsComplate(todo.id)
            }}></Checkbox>
            <Input value={todo.content} onChange={e => {
                onChangeContent(todo.id, e.target.value)
            }}></Input>
        </Space>
    )
}