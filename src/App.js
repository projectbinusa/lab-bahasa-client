import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./views/pages/auth/Login";
import Register from "./views/pages/auth/Register";
import ForgotPass from "./views/pages/auth/ForgotPass";
import Dashboard from "./views/pages/dashboard/Dashboard";
import Camera from "./views/pages/camera/camera";
import Whiteboard from "./views/pages/InteractiveWhiteboard/Whiteboard";

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
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/camera" component={Camera} exact />
          <Route path="/whiteboard" component={Whiteboard} exact />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
