import * as React from "react";
// import Logo from "@assets/images/logo.png";

import { DiagramsType } from "@root/App.d";

type NavigationType = {
  setActive: React.Dispatch<React.SetStateAction<DiagramsType>>;
};
const Navigation = ({ setActive }: NavigationType) => {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              {/* <img width={35} src={Logo} /> */}
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActive("current-value")}
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Current Value
                </button>
                <button
                  onClick={() => setActive("investments")}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Investments
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
