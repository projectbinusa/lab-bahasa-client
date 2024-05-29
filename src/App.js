import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./views/pages/auth/Login";
import Register from "./views/pages/auth/Register";
import ForgotPass from "./views/pages/auth/ForgotPass";
import Dashboard from "./views/pages/dashboard/Dashboard";
import Camera from "./views/pages/camera/camera";
import Whiteboard from "./views/pages/InteractiveWhiteboard/Whiteboard";
import ResponseCompetition from "./views/pages/response/ResponseCompetition";
import LoginSiswa from "./views/pages/auth/LoginSiswa";
import Questions from "./views/pages/response/Questions";
import SignedInformation from "./views/pages/cek sign in/SignedInformation";
import ManageClass from "./views/pages/manageClass/ManageClass";
import AddClass from "./views/pages/manageClass/AddClass";
import UpdateClass from "./views/pages/manageClass/UpdateClass";
import ManageName from "./views/pages/manageName/ManageName";
import AddName from "./views/pages/manageName/AddName";
import ScreenBroadcast from "./views/pages/screenBroadcast/ScreenBroadcast";
import UpdateName from "./views/pages/manageName/UpdateName";
import InteraksiStudent from "./views/pages/InteractiveWhiteboard/InteraksiStudent.js";

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
          <Route path="/manage-class" component={ManageClass} exact />
          <Route path="/add-class" component={AddClass} exact />
          <Route path="/update-class" component={UpdateClass} exact />
          <Route path="/manage-name" component={ManageName} exact />
          <Route path="/add-name" component={AddName} exact />
          <Route path="/update-name" component={UpdateName} exact />
          <Route path="/screen-broadcast" component={ScreenBroadcast} exact />
          <Route
            path="/response-competition"
            component={ResponseCompetition}
            exact
          />
          <Route path="/login-siswa" component={LoginSiswa} exact />
          <Route path="/questions" component={Questions} exact />
          <Route
            path="/signed-information"
            component={SignedInformation}
            exact
          />
          <Route
            path="/interaction-student"
            component={InteraksiStudent}
            exact
          />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
