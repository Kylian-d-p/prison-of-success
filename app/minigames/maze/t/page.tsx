import React from "react";
import CountdownComponent from "./test";

const App: React.FC = () => {
  return (
    <div>
      <CountdownComponent seconds={30} /> {/* Remplace 120 par la durée souhaitée en secondes */}
    </div>
  );
};

export default App;