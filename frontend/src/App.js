import React from "react";
import Header from "./components/Header";

const App = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div>
      <Header title="My Website" navigationLinks={links} />
    </div>
  );
};

export default App;
