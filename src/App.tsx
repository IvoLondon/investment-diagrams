import React from "react";
import { Choose, When } from "tsx-control-statements/components";

import * as Diagrams from "@components/diagrams";
import Navigation from "@components/Navigation";
import * as API from "@utils/apiHelpers";
import {
  DiagramsType,
  ITokens,
  IPortfolioDataType,
  CurrentPricesType,
} from "./App.d";

import * as ResponseData from "../data.json";
let response: typeof ResponseData;

if (process.env.REAL_DATA === "true") {
  response = require("../real.data.json");
} else {
  response = ResponseData;
}

import "./styles/index.scss";

const App = () => {
  const [diagram, setDiagram] = React.useState<DiagramsType>("investments");
  const [currentPrices, setCurrentPrices] = React.useState<CurrentPricesType>(
    {}
  );
  const [data, setData] = React.useState<any | IPortfolioDataType>({});

  React.useEffect(() => {
    const getCurrentPriceData = async (tokens: ITokens[]) => {
      const tokensIdCollection: Array<string> = [];

      tokens.map((token) => {
        tokensIdCollection.push(token.id);
      });

      const result = await API.currentTokenPrices(tokensIdCollection.join(","));
      setCurrentPrices(result);
    };
    if (response.data) {
      setData(response.data);
      getCurrentPriceData(response.data.tokens);
    }
  }, []);

  return (
    <div>
      <Navigation setActive={setDiagram} />
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex py-16">
          <div className="w-1/2 px-4 justify-items-center">
            <div className="max-w-lg">
              {data ? (
                <Diagrams.Allocations
                  livePrices={currentPrices}
                  portfolio={data}
                />
              ) : null}
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
            {data ? (
              <Diagrams.Investments
                livePrices={currentPrices}
                portfolio={data}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
