import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
function Header(props) {
  const logout = () => {
    Cookies.remove("token");
    props.history.replace("/login");
  };
  return (
    <nav className="navi-bar">
      <div className="navisection">
        <p className="logo">ANI APP</p>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
export default withRouter(Header);
