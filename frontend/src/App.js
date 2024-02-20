import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Electronic from './pages/Electronic';
import ContactUs from './pages/ContactUs';
import Accessories from './pages/Accessories';
import Collection from './pages/Collection';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ProductPage from './pages/ProductPage';
import SearchPage from './pages/SearchPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';

function App() {
  const {isloggedin} = useAuth()
  return (
    <div className="App flex flex-col w-[100vw] h-[100vh]">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/load' element={<Loader/>} ></Route>
        <Route path='/electronic' element={<Electronic/>}></Route>
        <Route path='/contactus' element={<ContactUs/>}></Route>
        <Route path='/accessories' element={<Accessories/>}></Route>
        <Route path='/collection' element={<Collection/>}></Route>
        <Route path='/product/:id' element={<ProductPage/>}  ></Route>
        <Route path='/search' element={<SearchPage/>} ></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        {isloggedin && <Route path='/me' element={<Profile/>}></Route>}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
