import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Info from "./components/Info";
import Hero from "./components/Hero";
import Porfolio from "./components/Portfolio";
function App() {
  return (
    <>
      <Hero></Hero>
      <Porfolio>Keletas nuotrauku pasigrozeti</Porfolio>
    </>
  );
}

export default App;
