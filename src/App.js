import Home from "./pages/Home";
import Header from "./components/Header";
import "@rainbow-me/rainbowkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [base, sepolia],
  [
    alchemyProvider({ apiKey: "Zi_F-3fTztPtozvm58nBdd21noBes10h" }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "Int Blog",
  projectId: "fae5ae2887f2f851e208f133a2fb1177",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function App() {
  return (
    <div className="App">
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider coolMode chains={chains}>
        <Header />
        <Home />
        
      </RainbowKitProvider>
    </WagmiConfig>
     </div>
  );
}



export default App;
