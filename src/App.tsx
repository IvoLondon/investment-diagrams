import React from "react";
import { Choose, When } from "tsx-control-statements/components";

import * as Diagrams from "@components/diagrams";
import Navigation from "@components/Navigation";
import * as API from "@utils/apiHelpers";
import { DiagramsType, PortfolioDataType, CurrentPricesType } from "./App.d";

import * as ResponseData from "../data.json";
let response: typeof ResponseData;

if (process.env.DEMO === "true") {
  response = require("../example.data.json");
} else {
  response = ResponseData;
}

import "./styles/index.scss";

const App = () => {
  const [diagram, setDiagram] = React.useState<DiagramsType>("investments");
  const [currentPrices, setCurrentPrices] = React.useState<CurrentPricesType>(
    {}
  );

  React.useEffect(() => {
    const getCurrentPriceData = async () => {
      const tokensIdCollection: Array<string> = [];

      response.data.tokens.map((token) => {
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
        <div className="relative flex py-16">
          <div className="w-1/2 px-4 justify-items-center">
            <div className="max-w-lg">
              <Diagrams.Allocations
                livePrices={currentPrices}
                portfolio={response.data as PortfolioDataType}
              />
            </div>
          </div>
          <div className="w-1/2 px-4">
            {/* <Choose>
              <When condition={diagram === "current-value"}>
                <Diagrams.CurrentValue />
              </When>
              <When condition={diagram === "investments"}>
              </When>
            </Choose> */}
            <Diagrams.Investments
              livePrices={currentPrices}
              portfolio={response.data as PortfolioDataType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
