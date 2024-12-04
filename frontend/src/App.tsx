import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./layout/Home";
import Earn from "./layout/Earn";
import Friend from "./layout/Friend";
import Wallet from "./layout/Wallet";

function App() {
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
