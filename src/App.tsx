import React from "react";
import { Choose, When } from "tsx-control-statements/components";
import Logo from "./assets/images/logo.png";
import * as Diagrams from "./diagrams";
import Data from "../data.json";

import "./styles/index.scss";

type Diagrams = "current-value" | "investments";

const App = () => {
  const [diagram, setDiagram] = React.useState<Diagrams>("current-value");

  return (
    <div>
      <header>
        <img src={Logo} />
        <button onClick={() => setDiagram("current-value")}>
          Current Value
        </button>
        <button onClick={() => setDiagram("investments")}>Investments</button>
      </header>
      Does it work? {Data.data.status}
      <Choose>
        <When condition={diagram === "current-value"}>
          <Diagrams.CurrentValue />
        </When>
        <When condition={diagram === "investments"}>
          <Diagrams.Investments />
        </When>
      </Choose>
    </div>
  );
};

export default App;
