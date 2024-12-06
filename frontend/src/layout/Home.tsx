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
               "X-Telegram-Data": WebApp.initData,
            },
            body: JSON.stringify({
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
         <div className="p-[2px] bg-gradient-to-r from-blue-500 to-blue-900 max-w-48 rounded-xl">
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

         <div className="mt-14 flex flex-col min-h-[26rem] -mx-4 rounded-t-[3.4rem] bg-gray-900 border-t-2 border-blue-700 shadow-[rgba(79,63,252,0.3)_0px_2px_2px_8px]">
            {/*  */}
         </div>
      </>
   );
}

export default Home;
