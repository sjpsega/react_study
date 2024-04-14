import './App.css';
import { 
  BrowserRouter, 
  Routes,
  Route
} from 'react-router-dom'
import TodoList from './Pages/TodoList/TodoList';
import TodoCellEdit from './Pages/TodoList/Components/TodoCellEdit';
import Navbar from './Common/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route exact path='/' Component={TodoList}></Route>
          <Route exact path='/todo/:id' Component={TodoCellEdit}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
