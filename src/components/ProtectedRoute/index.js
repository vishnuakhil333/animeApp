import { Route } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute(props) {
  const token = Cookies.get("token");
  if (token === undefined) {
    return <Route to="login" />;
  }
  console.log("Protected Route Triggered");
  return <Route {...props} />;
}
export default ProtectedRoute;
