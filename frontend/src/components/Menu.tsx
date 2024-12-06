import { GiftIcon, HomeIcon, UsersIcon, Wallet2Icon } from "lucide-react";
import { Link } from "react-router-dom";

function Menu() {
   return (
      <div
         className="fixed bottom-0 w-full py-3 bg-gradient-to-b from-blue-600 to-blue-950 text-white"
         style={{ zIndex: 10 }}
      >
         <div className="flex content-between">
            <Link to="/" className="flex flex-1 justify-center">
               <div className="flex flex-col items-center">
                  <HomeIcon className="size-5" />
                  <span className="block font-semibold text-xs">Home</span>
               </div>
            </Link>
            <Link to="/earn" className="flex flex-1 justify-center">
               <div className="flex flex-col items-center">
                  <GiftIcon className="size-5" />
                  <span className="block font-semibold text-xs">Earn</span>
               </div>
            </Link>
            <Link to="/friends" className="flex flex-1 justify-center">
               <div className="flex flex-col items-center">
                  <UsersIcon className="size-5" />
                  <span className="block font-semibold text-xs">Friends</span>
               </div>
            </Link>
            <Link to="/wallet" className="flex flex-1 justify-center">
               <div className="flex flex-col items-center">
                  <Wallet2Icon className="size-5" />
                  <span className="block font-semibold text-xs">Wallet</span>
               </div>
            </Link>
         </div>
      </div>
   );
}

export default Menu;
