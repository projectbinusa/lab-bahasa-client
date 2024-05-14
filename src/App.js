import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./views/pages/auth/Login";
import Register from "./views/pages/auth/Register";
import ForgotPass from "./views/pages/auth/ForgotPass";

// END ADMIN MENU REGULASI

function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          {/* auth */}
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/forgotpass" component={ForgotPass} exact />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
