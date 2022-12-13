import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Home } from './Pages/Home';
import { People } from './Pages/People';
import {PersonDetails} from './Pages/PersonDetails';
import { CreatePerson } from './Pages/CreatePerson';

function App() {
  return (
    <>
    <Router>
    <Header/>
    <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/People' element={<People/>} />
        <Route path='/People/:id' element={<PersonDetails/>} />
        <Route path='/CreatePerson' element={<CreatePerson/>} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
