import "../styles/globals.css";

import { NavBar, Footer } from "../Components";
import { CryptoPredictionProvider } from "../Context/CryptoPredictor.js";
import { WagmiProvider } from "wagmi";
import { config } from "../utils/config.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <div>
      <CryptoPredictionProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ConnectKitProvider>
              <NavBar />
              <Component {...pageProps} />
              <Footer />
            </ConnectKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </CryptoPredictionProvider>
    </div>
  );
}
