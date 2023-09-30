import React from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
    return (
        <header className="flex justify-center items-center h-16 bg-gray-800 text-white">     
          <button> </button>
          <ConnectButton showBalance />
        </header>
      );
};

export default Header;