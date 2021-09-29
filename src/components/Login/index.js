import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import "./index.css";
function Login(props) {
  const loginApiUrl =
    "https://api.aniapi.com/v1/oauth?response_type=token&client_id=17e8f9ff-d543-4bf1-9cff-bb621828302d&redirect_uri=https://29eng.csb.app/";
  const signUpUrl = "https://aniapi.com/signup";

  const token = Cookies.get("token");

  if (token !== undefined) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login-container">
      <div className="login-section">
        <button className="cutsom-btn">
          <a href={signUpUrl} rel="noreferrer" target="_blank">
            SignUp
          </a>
        </button>

        <button className="cutsom-btn">
          <a href={loginApiUrl}>Login</a>
        </button>
      </div>
    </div>
  );
}
export default Login;
