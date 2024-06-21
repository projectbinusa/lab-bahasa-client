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
import ChatApp from "./views/pages/Chat/ChatApp";
import TopikChat from "./views/pages/Chat/TopikChat";
import UpdateName from "./views/pages/manageName/UpdateName";
import InteraksiStudent from "./views/pages/InteractiveWhiteboard/InteraksiStudent";
import VerifyCode from "./views/pages/auth/VerifyCode";
import ResetPassword from "./views/pages/auth/ResetPassword";
import AddGroup from "./views/pages/Chat/AddGroup";
import Navbar1 from "./component/Navbar1";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import PrivateRoute from "./utils/PrivateRoutes";
import ChatPribadi from "./views/pages/Chat/ChatPribadi";
import ScoreAnswer from "./views/pages/response/ScoreAnswer";
import AnswerQuestion from "./views/pages/student/Answer";
import QuestionsAnswer from "./views/pages/student/QuestionsAnswer";

const checkTokenExpiration = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }
};

const App = () => {
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!checkTokenExpiration()) {
        history.push("/");
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [history]);

  return (
    <BrowserRouter>
      {/* <Navbar1/> */}
      <main>
        <Switch>
          {/* auth */}
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/forgotpass" component={ForgotPass} exact />
          <PrivateRoute path="/dashboard/:id" component={Dashboard} exact />
          <PrivateRoute path="/camera" component={Camera} exact />
          <PrivateRoute path="/whiteboard" component={Whiteboard} exact />
          <PrivateRoute path="/manage-class" component={ManageClass} exact />
          <PrivateRoute path="/verify-code" component={VerifyCode} exact />
          <PrivateRoute path="/add-class" component={AddClass} exact />
          <PrivateRoute
            path="/update-class/:id"
            component={UpdateClass}
            exact
          />
          <PrivateRoute path="/manage-name" component={ManageName} exact />
          <PrivateRoute path="/add-name" component={AddName} exact />
          <PrivateRoute path="/update-name/:id" component={UpdateName} exact />
          <PrivateRoute path="/add-group" component={AddGroup} exact />
          <PrivateRoute
            path="/screen-broadcast"
            component={ScreenBroadcast}
            exact
          />
          <PrivateRoute path="/group-chat" component={ChatApp} exact />
          <PrivateRoute path="/topic-chat" component={TopikChat} exact />
          <PrivateRoute
            path="/response-competition"
            component={ResponseCompetition}
            exact
          />
          <Route path="/login-siswa" component={LoginSiswa} exact />
          <PrivateRoute path="/questions" component={Questions} exact />
          <PrivateRoute
            path="/signed-information"
            component={SignedInformation}
            exact
          />
          <PrivateRoute
            path="/interaction-student"
            component={InteraksiStudent}
            exact
          />
          <Route
            path="/reset-password/:token"
            component={ResetPassword}
            exact
          />
          <Route path="/score-answer/:id" component={ScoreAnswer} exact />
          <Route path="/student-answer/:id" component={AnswerQuestion} />
          <Route path="/question-answer" component={QuestionsAnswer} exact />
          <Route path="/face-to-face-chat" component={ChatPribadi} exact />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
