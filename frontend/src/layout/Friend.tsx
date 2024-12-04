import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import Share from "./partials/Share";

interface ReffResponse {
   message: string;
   result: {
      code: string | null;
      referrals: {
         name: string;
         isPremium: boolean;
      }[];
      t_premium: number;
      t_npremium: number;
   };
}

function Friend() {
   const [data, setData] = useState<ReffResponse | null>(null);
   useEffect(() => {
      async function fetchData() {
         const data = await fetch(import.meta.env.VITE_API_URL + "/user/reff", {
            method: "POST",
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               telegramId: WebApp.initDataUnsafe.user?.id,
            }),
         });
         const json: ReffResponse = await data.json();
         setData(json);
      }

      if (WebApp.initDataUnsafe.user && WebApp.initDataUnsafe) {
         fetchData();
      }
   }, []);

   return (
      <>
         <div className="p-[2px] bg-gradient-to-r from-blue-500 to-blue-900 rounded-xl">
            <Card className="bg-gray-800 text-white shadow-lg border-none">
               <CardHeader className="text-xl font-semibold">
                  Invite Friends & earn
               </CardHeader>
               <CardContent>
                  <p>
                     Reguler user: <b>{data?.result.t_npremium}</b>
                  </p>
                  <p>
                     Premium user: <b>{data?.result.t_premium}</b>
                  </p>
               </CardContent>
            </Card>
         </div>

         <h2 className="text-xl font-semibold mb-4 mt-10">
            Your friends (
            {data?.result && data?.result.t_npremium + data?.result.t_premium})
         </h2>

         {data?.result.referrals.map((val, key) => (
            <Card key={key} className="border-none bg-gray-700 text-white mb-4">
               <CardHeader className="font-semibold p-3 flex flex-row justify-between items-center mx-2">
                  <div>{val.name}</div>
                  <div className="text-green-500">
                     {val.isPremium ? "+5" : "+1"}
                  </div>
               </CardHeader>
            </Card>
         ))}

         <Share reff={data?.result.code} />
      </>
   );
}

export default Friend;
