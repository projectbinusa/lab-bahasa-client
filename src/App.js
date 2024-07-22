import React from "react";
import { Routes, Route, Navigate, HashRouter, Router } from "react-router-dom";
import Login from "./views/pages/auth/Login";
import Register from "./views/pages/auth/Register";
import ForgotPass from "./views/pages/auth/ForgotPass";
import Dashboard from "./views/pages/dashboard/Dashboard";
import Camera from "./views/pages/camera/camera";
import ResponseCompetition from "./views/pages/response/ResponseCompetition";
import LoginSiswa from "./views/pages/auth/LoginSiswa";
import Questions from "./views/pages/response/Questions";
import SignedInformation from "./views/pages/cek sign in/SignedInformation";
import ManageClass from "./views/pages/manageClass/ManageClass";
import AddClass from "./views/pages/manageClass/AddClass";
import UpdateClass from "./views/pages/manageClass/UpdateClass";
import ManageName from "./views/pages/manageName/ManageName";
import AddName from "./views/pages/manageName/AddName";
import ChatApp from "./views/pages/Chat/ChatApp";
import TopikChat from "./views/pages/Chat/TopikChat";
import UpdateName from "./views/pages/manageName/UpdateName";
// import InteraksiStudent from "./views/pages/InteractiveWhiteboard/InteraksiStudent";
import VerifyCode from "./views/pages/auth/VerifyCode";
import ResetPassword from "./views/pages/auth/ResetPassword";
import AddGroup from "./views/pages/Chat/AddGroup";
// import Navbar1 from "./component/Navbar1";
import PrivateRoute from "./utils/PrivateRoutes";
import ChatPribadi from "./views/pages/Chat/ChatPribadi";
import ScoreAnswer from "./views/pages/response/ScoreAnswer";
import AnswerQuestion from "./views/pages/student/Answer";
import QuestionsAnswer from "./views/pages/student/QuestionsAnswer";
import TabelClass from "./views/pages/auth/TabelClass";
import CodeMeet from "./views/pages/screenBroadcast/CodeMeet";
// import Room from "./views/pages/screenBroadcast/Room";
import { RoomProvider } from "./views/pages/screenBroadcast/RoomProvider";
import Index from "./views/pages/camera/Index";
// import StudentCamera from "./views/pages/camera/StudentCamera";
// import RealtimeWhiteBoard from "./views/pages/InteractiveWhiteboard/RealtimeWhiteBoard";
// import Rooms from "./views/pages/InteractiveWhiteboard/RealtimeWhiteBoard";
// import ClientRoom from "./views/pages/InteractiveWhiteboard/percobaan/ClientRoom";
// import RealtimeInteraksi from "./views/pages/InteractiveWhiteboard/RealtimeInteraksi";
// import Roomss from "./views/pages/InteractiveWhiteboard/RealtimeInteraksi";
// import ClientRoomStudent from "./views/pages/InteractiveWhiteboard/percobaan/ClientRoomStudent";
// import StudentInteraksi from "./views/pages/InteractiveWhiteboard/StudentInteraksi";
import PilihanGanda from "./views/pages/response/PilihanGanda";
import SoalPilihanGanda from "./views/pages/PilihanGanda/SoalPilihanGanda";
import MultipleQuestion from "./views/pages/response/MultipleQuestion";
import JawabMultipleQuestion from "./views/pages/response/JawabMultipleQuestion";
import VideoSdk from "./views/pages/InteractiveWhiteboard/VideoSdk";
import DetailsAnswer from "./views/pages/response/DetailsAnswer";
import "../src/css/room.css";

const App = () => {
  return (
    <RoomProvider>
      <HashRouter>
        {/* <Router> */}
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/login-siswa" element={<LoginSiswa />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Private Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/camera/:classId"
            element={
              <PrivateRoute>
                <Camera />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/whiteboard/:classId"
            element={
              <PrivateRoute>
                <Whiteboard />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/manage-class/:classId"
            element={
              <PrivateRoute>
                <ManageClass />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-class"
            element={
              <PrivateRoute>
                <AddClass />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-class/:id"
            element={
              <PrivateRoute>
                <UpdateClass />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-name/:classId"
            element={
              <PrivateRoute>
                <ManageName />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-name"
            element={
              <PrivateRoute>
                <AddName />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-name/:id"
            element={
              <PrivateRoute>
                <UpdateName />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-group"
            element={
              <PrivateRoute>
                <AddGroup />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/screen-broadcast"
            element={
              <PrivateRoute>
                <ScreenBroadcast />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/group-chat/:classId"
            element={
              <PrivateRoute>
                <ChatApp />
              </PrivateRoute>
            }
          />
          <Route
            path="/topic-chat/:classId"
            element={
              <PrivateRoute>
                <TopikChat />
              </PrivateRoute>
            }
          />
          <Route
            path="/response-competition/:classId"
            element={
              <PrivateRoute>
                <ResponseCompetition />
              </PrivateRoute>
            }
          />
          <Route
            path="/questions/:classId"
            element={
              <PrivateRoute>
                <Questions />
              </PrivateRoute>
            }
          />
          <Route
            path="/details-answer/:classId/id/:id"
            element={
              <PrivateRoute>
                <DetailsAnswer />
              </PrivateRoute>
            }
          />
          <Route
            path="/pilihan-ganda/:classId"
            element={
              <PrivateRoute>
                <PilihanGanda />
              </PrivateRoute>
            }
          />
          <Route
            path="/jawab-soal-pilihan-ganda/:classId/id/:id"
            element={
              <PrivateRoute>
                <JawabMultipleQuestion />
              </PrivateRoute>
            }
          />
          <Route
            path="/multiple-question/:classId"
            element={
              <PrivateRoute>
                <MultipleQuestion />
              </PrivateRoute>
            }
          />
          <Route
            path="/list-soal-pilihan-ganda/:classId"
            element={
              <PrivateRoute>
                <SoalPilihanGanda />
              </PrivateRoute>
            }
          />
          <Route
            path="/signed-information/:classId"
            element={
              <PrivateRoute>
                <SignedInformation />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/interaction-student/:classId"
            element={
              <PrivateRoute>
                <InteraksiStudent />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/score-answer/:id"
            element={
              <PrivateRoute>
                <ScoreAnswer />
              </PrivateRoute>
            }
          />
          <Route
            path="/student-answer/:id"
            element={
              <PrivateRoute>
                <AnswerQuestion />
              </PrivateRoute>
            }
          />
          <Route
            path="/question-answer/:classId"
            element={
              <PrivateRoute>
                <QuestionsAnswer />
              </PrivateRoute>
            }
          />
          <Route
            path="/face-to-face-chat/:classId"
            element={
              <PrivateRoute>
                <ChatPribadi />
              </PrivateRoute>
            }
          />
          <Route
            path="/tabel-class"
            element={
              <PrivateRoute>
                <TabelClass />
              </PrivateRoute>
            }
          />
          <Route
            path="/face-to-face-chat"
            element={
              <PrivateRoute>
                <ChatPribadi />
              </PrivateRoute>
            }
          />
          <Route
            path="/code-room/:classId"
            element={
              <PrivateRoute>
                <CodeMeet />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/room/:roomID"
            element={
              <PrivateRoute>
                <Room />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/code-room-camera/:classId"
            element={
              <PrivateRoute>
                <Index />
              </PrivateRoute>
            }
          />
          <Route
            path="/room-camera/:cameraId"
            element={
              <PrivateRoute>
                <Camera />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/student-camera/:cameraId"
            element={
              <PrivateRoute>
                <StudentCamera />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
            path="/realtime-whiteboard"
            element={
              <PrivateRoute>
                <RealtimeWhiteBoard />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/meet-online/:roomID"
            element={
              <PrivateRoute>
                <VideoSdk />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/whiteboard-instruktur"
            element={
              <PrivateRoute>
                <Rooms />
              </PrivateRoute>
            }
          />
          <Route
            path="/whiteboard-student"
            element={
              <PrivateRoute>
                <ClientRoom />
              </PrivateRoute>
            }
          />
          <Route
            path="/realtime-interaction"
            element={
              <PrivateRoute>
                <RealtimeInteraksi />
              </PrivateRoute>
            }
          />
          <Route
            path="/interaction-instruktur"
            element={
              <PrivateRoute>
                <Roomss />
              </PrivateRoute>
            }
          />
          <Route
            path="/interaksi-student"
            element={
              <PrivateRoute>
                <ClientRoomStudent />
              </PrivateRoute>
            }
          /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* </Router> */}
      </HashRouter>
    </RoomProvider>
  );
};

export default App;
