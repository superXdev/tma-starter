import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

interface UserData {
   id: number;
   first_name: string;
   last_name?: string;
   username?: string;
   language_code: string;
   is_premium?: boolean;
}

function Home() {
   const [userData, setUserData] = useState<UserData | null>(null);

   useEffect(() => {
      async function initUser() {
         await fetch(import.meta.env.VITE_API_URL + "/user", {
            method: "POST",
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               data: WebApp.initData,
               reff: WebApp.initDataUnsafe.start_param || "",
            }),
         });
      }

      if (WebApp.initDataUnsafe.user && WebApp.initDataUnsafe) {
         setUserData(WebApp.initDataUnsafe.user as UserData);
         initUser();
      }
   }, []);

   return (
      <>
         <div className="p-[2px] bg-gradient-to-r from-purple-600 via-cyan-700 to-green-900 max-w-48 rounded-xl">
            <div className="bg-gray-900 p-2 text-white flex w-full h-full gap-2 rounded-xl">
               <div>
                  <img
                     src={
                        import.meta.env.VITE_API_URL +
                        "/avatars/" +
                        userData?.id +
                        ".jpg"
                     }
                     alt="Profile"
                     className="rounded-xl"
                     width={48}
                  />
               </div>
               <div>
                  <h2 className="font-semibold">
                     {userData?.first_name} {userData?.last_name}
                  </h2>
                  <h3 className="text-xs">@{userData?.username}</h3>
               </div>
            </div>
         </div>

         <div className="mt-14 flex flex-col h-screen -mx-4 rounded-t-[3.4rem] bg-gray-900 border-t-2 border-blue-700 shadow-[rgba(79,63,252,0.3)_0px_0px_0px_8px]">
            <div className="my-6 text-center">
               <h1 className="text-2xl">Your point</h1>
               <h2 className="text-4xl text-green-600 font-semibold">0</h2>
            </div>
         </div>
      </>
   );
}

export default Home;