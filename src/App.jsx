import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from "./PrivateRoute";
import { Login } from './Login';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import "./app.css"
import { Home } from './Home';
import AuthProvider from './AuthProvider';
import { Users } from './Users';
import { Roles } from './Roles';
import MoonLoader from "react-spinners/MoonLoader";
import RouteChangeHandler from './RouteChangeHandler';
import { Recrutement } from './Recrutement';

function App() {
  const [loading,setloading]=useState(false)

  return (<>
    <Router>
    <RouteChangeHandler setLoading={setloading} />
      {!loading?<AuthProvider>
        <Navbar/>
        <div style={{minHeight:'100vh',background:'rgba(111,111,111,.1)'}}>
          <Routes>
            <Route path="/login" element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
            <Route path='/' element={<Home/>}/>
              <Route path='/users' element={<Users/>}/>
              <Route path='/roles' element={<Roles/>}/>
              <Route path='/recrutement' element={<Recrutement/>}/>
              <Route path="/*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>:
      <div style={{position:"fixed",width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",background:"white"}}>
        <MoonLoader
        color={"red"}
        loading={loading}
        size={150}
        aria-label="MoonLoader"
        data-testid="loader"
      />
      </div>
    }
    </Router>
    <Footer/>
  </>
  );
}

export default App;
