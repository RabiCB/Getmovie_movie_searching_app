
import './App.css';
import Interface from './Components/Interface';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Information from './Components/Information';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    
      <Route path='/' element={<Interface/>}/>
      <Route path="value/:id" element={<Information/>}/>
      </Routes>
    
    </BrowserRouter>
    </>
  );
}

export default App;
