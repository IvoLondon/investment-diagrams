import React from "react";
import { Choose, When } from "tsx-control-statements/components";

import * as Diagrams from "@components/diagrams";
import Navigation from "@components/Navigation";
import * as API from "@utils/apiHelpers";
import Data from "../data.json";
import { DiagramsType, PortfolioDataType, CurrentPricesType } from "./App.d";

import "./styles/index.scss";

const App = () => {
  const [diagram, setDiagram] = React.useState<DiagramsType>("investments");
  const [currentPrices, setCurrentPrices] = React.useState<CurrentPricesType>(
    {}
  );

  React.useEffect(() => {
    const getCurrentPriceData = async () => {
      const tokensIdCollection: Array<string> = [];

      Data.data.tokens.map((token) => {
        tokensIdCollection.push(token.id);
      });

      const result = await API.currentTokenPrices(tokensIdCollection.join(","));
      setCurrentPrices(result);
    };
    getCurrentPriceData();
  }, []);

  return (
    <div>
      <Navigation setActive={setDiagram} />

      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center py-16 justify-center">
          <div className="max-w-6xl">
            {/* <Choose>
              <When condition={diagram === "current-value"}>
                <Diagrams.CurrentValue />
              </When>
              <When condition={diagram === "investments"}>
              </When>
            </Choose> */}
            <Diagrams.Investments
              livePrices={currentPrices}
              portfolio={Data.data as PortfolioDataType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
