import React from "react";
import { Switch, Route } from "react-router-dom";

import "./style.css";
import { PokemonList } from "./components/PokemonList";
import { Pokemon } from "./components/Pokemon";

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={PokemonList} />
        <Route path="/pokemon/:name" exact component={Pokemon} />
      </Switch>
    </>
  );
}
