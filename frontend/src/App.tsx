import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import Home from "./layout/Home";
import Earn from "./layout/Earn";
import Friend from "./layout/Friend";
import Wallet from "./layout/Wallet";
import { useEffect } from "react";

function App() {
   ReactGA.initialize(import.meta.env.VITE_GA_ID);

   const location = useLocation();
   useEffect(() => {
      ReactGA.send({
         hitType: "pageview",
         page: location.pathname + location.search,
      });
   }, [location]);

   return (
      <div className="p-4">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/earn" element={<Earn />} />
            <Route path="/friends" element={<Friend />} />
            <Route path="/wallet" element={<Wallet />} />
         </Routes>
      </div>
   );
}

export default App;
