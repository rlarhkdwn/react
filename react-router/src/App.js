import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Comp1 from './components/Comp1';
import Comp2 from './components/Comp2';
import Comp3 from './components/Comp3';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/comp1' element={<Comp1 />}/>
                    <Route path='/comp2' element={<Comp2 />}/>
                    <Route path='/comp3' element={<Comp3 />}/>
                </Routes>

                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
