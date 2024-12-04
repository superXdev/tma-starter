import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WebApp from "@twa-dev/sdk";
import "./index.css";
import App from "./App.tsx";
import Menu from "./components/Menu.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

WebApp.MainButton.hide();
WebApp.expand();
WebApp.ready();
WebApp.enableClosingConfirmation();

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <BrowserRouter>
         <Toaster />
         <TonConnectUIProvider
            manifestUrl={
               import.meta.env.VITE_PUBLIC_URL + "/tonconnect-manifest.json"
            }
         >
            <App />
         </TonConnectUIProvider>
         <Menu />
      </BrowserRouter>
   </StrictMode>
);
