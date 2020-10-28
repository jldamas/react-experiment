import React from "react";
import "./index.css";
import SimpleSelect from "./Components/SimpleSelect";
import {SelectProvider} from "./Components/SelectContext";

export default function App() {
  return (
      <SelectProvider>
        <SimpleSelect />
      </SelectProvider>
  );
}
