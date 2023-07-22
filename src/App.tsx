import './App.css';
import { Route, Routes } from 'react-router-dom';
import Cards from './pages/business/cards';
import Header from './components/Header';
import Footer from './components/Footer';
import AddPage from './pages/addPage';
import SignUp from './auth/SignUp';
import Login from './auth/login';
import RouteGuard from './auth/RouteGuard';
import FavCardsPage from './pages/favCardsPage';
import { createContext, useContext, useState } from 'react';
import MyCardsPage from './pages/myCardsPage';
  import 'react-toastify/dist/ReactToastify.css';
import EditPage from './pages/editPage';
import ViewPage from './pages/viewPage';
import AboutPage from './pages/aboutPage';
import RouteBusiness from './auth/RouteBusiness';
interface Context{
    search:string;
    setSearch:Function;
}
export const AppContext = createContext<Context | null>(null);
function App() {
   const [search, setSearch] = useState('');
   const [mainColor, setMainColor] = useState('#1F51FF');
   const [secondaryColor, setSecondaryColor] = useState('white');
   const [cardColor, setCardColor] = useState('white');
   const [textColor, setTextColor] = useState('black');
  return (
    <>
       <Header
       background={mainColor}
       />
     <AppContext.Provider value={{
       search,
       setSearch,
      }}>
      <div className='main-div' style={{backgroundColor:secondaryColor,color:textColor}}>
       {mainColor=='#1F51FF' && <li className="nav-link">
                        <button
                        className="btn"
                        style={{backgroundColor:"blue", marginTop:"10vh",position:'fixed'}}
                        onClick={()=>{
                          setMainColor("black")
                          setSecondaryColor("grey")
                          setTextColor("white")
                          setCardColor("black")
                        }
                        }
                        >
                         <i className="bi bi-moon-fill nav-link text-light"></i>
                         </button>
                    </li>
}
                    {mainColor=='black'&&<li className="nav-link">
                        <button
                        className="btn"
                        style={{backgroundColor:"black", marginTop:"10vh",position:'fixed'}}
                        onClick={()=>{
                          setMainColor('#1F51FF')
                          setSecondaryColor("white")
                          setTextColor('black')
                          setCardColor("white")
                      }}
                        >
                         <i className="bi bi-sun-fill nav-link text-danger"></i>
                         </button>
                    </li> 
    }
    <Routes>
      <Route path="/allCards" element={
        <RouteGuard>
           <Cards 
           background={cardColor}
           color={textColor}
           />
        </RouteGuard>
      } />
      <Route path="/addPage" element={
           <RouteGuard>
            <RouteBusiness>
             <AddPage 
             background={mainColor}
             color={textColor}
             />
            </RouteBusiness>
          </RouteGuard>
      } />
      <Route path="" element={
             <AboutPage 
              background={cardColor}
              color={textColor}
             />
      } />
      <Route path="/editPage/:_id" element={
           <RouteGuard>
             <EditPage 
             background={mainColor}
             color={textColor}
             />
          </RouteGuard>
      } />
      <Route path="/viewPage/:_id" element={
           <RouteGuard>
             <ViewPage 
             background={mainColor}
             color={textColor}
             />
          </RouteGuard>
      } />
      <Route path="/favorites" element={
          <RouteGuard>
            <FavCardsPage
             background={cardColor}
             color={textColor}
           />
         </RouteGuard>
      } />
      <Route path="/myCards" element={
          <RouteGuard>
            <RouteBusiness>
            <MyCardsPage
            background={cardColor}
             color={textColor}
            />
            </RouteBusiness>
          </RouteGuard>
      } />
      <Route path="/signup" element={
      <SignUp 
             background={mainColor}
             color={textColor}
      />
      } />
      <Route path="/login" element={
      <Login
      background={mainColor}
      color={textColor} 
      />
      } />
    </Routes>
    </div>
    </AppContext.Provider>
    <Footer
     background={mainColor==="#1F51FF"?"grey":"black"}
     color={textColor}
    />

    </>

  );
}

export default App;
