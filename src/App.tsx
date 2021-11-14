import React from "react";
import { Choose, When } from "tsx-control-statements/components";

import * as Diagrams from "@components/diagrams";
import Navigation from "@components/Navigation";
import Data from "../data.json";
import { DiagramsType, DataType } from "./App.d";

import "./styles/index.scss";

const App = () => {
  const [diagram, setDiagram] = React.useState<DiagramsType>("investments");
  return (
    <div>
      <Navigation setActive={setDiagram} />

      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center py-16 justify-center">
          <div className="max-w-6xl">
            <Choose>
              <When condition={diagram === "current-value"}>
                <Diagrams.CurrentValue />
              </When>
              <When condition={diagram === "investments"}>
                <Diagrams.Investments data={Data.data as DataType} />
              </When>
            </Choose>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
