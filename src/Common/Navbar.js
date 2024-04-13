import { 
    Link
  } from 'react-router-dom'
import { Typography } from 'antd'
const { Title } = Typography

export default function Navbar () {
    return (
        <>
            <Title>TodoList</Title>
            <div style={{marginBottom: '10px'}}>
                <Link to={'/'}>Home</Link>
            </div>
        </>
    )
}