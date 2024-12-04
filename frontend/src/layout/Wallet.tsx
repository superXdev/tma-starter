import { TonConnectButton } from "@tonconnect/ui-react";

function Wallet() {
   return (
      <div className="min-h-screen flex justify-center items-center">
         <div>
            <TonConnectButton />
         </div>
      </div>
   );
}

export default Wallet;
