import { BrowserRouter, Switch, Route } from "react-router-dom";
import Anime from "./components/Anime";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/:id" component={Anime} />
      </Switch>
    </BrowserRouter>
  );
}
