import './App.css'
import { Route, Routes } from "react-router-dom";
//components
//import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Watchlist from "./components/Watchlist";
import Signin from "./components/Signin";
import Home from "./components/Home";
import NavigationBar from './components/NavigationBar';
import DetailedPage from "./components/DetailedPage";
function App() {
  return (
    <>
      <NavigationBar></NavigationBar>
    

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/watchlist" element={<Watchlist/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/detailedpage" element={<DetailedPage/>}></Route>
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;
