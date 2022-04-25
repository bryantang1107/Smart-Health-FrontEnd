import Nav from "./nav/Nav";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Home from "./pages/home/index";
import About from "./pages/About";
import Covid from "./pages/Covid";
import HealthForum from "./pages/HealthForum";
import Health from "./pages/Health";
import Doctor from "./pages/Doctor";
import Doctorz from "./Doctor/Doctor";
import Article from "./pages/Article";
import Footer from "./footer/Footer";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./nav/PrivateRoute";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Qna from "./pages/Qna";
import Reminder from "./pages/Reminder";
import ChatRoom from "./pages/ChatRoom";
import Join from "./ChatRoom/Join";
import Contact from "./pages/Contact";
import Pharmacy from "./pages/Pharmacy";
import Location from "./pages/Location";
import Discussion from "./pages/Discussion";
import MedicalRecord from "./doctorPage/MedicalRecord";
import Name from "./ChatRoom/Name";
import Tnc from "./Doctor/Tnc";
import Schedule from "./pages/Schedule";
import Patient from "./doctorPage/Patient";
import { useSelector } from "react-redux";
import Appointment from "./doctorPage/Appointment";
import CancelAppointment from "./Doctor/CancelAppointment";
import ActivityLog from "./doctorPage/ActivityLog";
const App = () => {
  const data = useSelector((state) => state.roleReducer);

  return (
    <>
      <AuthProvider>
        <Nav></Nav>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <PrivateRoute
            exact
            path="/home/about"
            component={About}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/home/contact"
            component={Contact}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/covid-19/statistics"
            component={Covid}
          ></PrivateRoute>
          {data.role === "doctor" && (
            <PrivateRoute
              exact
              path="/patient-record"
              component={Patient}
            ></PrivateRoute>
          )}
          {data.role === "doctor" && (
            <PrivateRoute
              exact
              path="/activity-log"
              component={ActivityLog}
            ></PrivateRoute>
          )}
          {data.role === "doctor" && (
            <PrivateRoute
              exact
              path="/upload/medical-record"
              component={MedicalRecord}
            ></PrivateRoute>
          )}
          {data.role === "doctor" && (
            <PrivateRoute
              exact
              path="/schedule"
              component={Appointment}
            ></PrivateRoute>
          )}

          <PrivateRoute
            exact
            path="/support/qna"
            component={Qna}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/covid-19/articles"
            component={Article}
          ></PrivateRoute>
          {data.role === "user" && (
            <PrivateRoute
              exact
              path="/health-forum"
              component={HealthForum}
            ></PrivateRoute>
          )}
          {data.role === "user" && (
            <PrivateRoute
              exact
              path="/cancel-appointment"
              component={CancelAppointment}
            ></PrivateRoute>
          )}
          {data.role === "user" && (
            <PrivateRoute
              exact
              path="/medical-services/discussion"
              component={Discussion}
            ></PrivateRoute>
          )}

          <PrivateRoute
            exact
            path="/health-content"
            component={Health}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/pharmacy"
            component={Pharmacy}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/pharmacy/location"
            component={Location}
          ></PrivateRoute>
          {data.role === "user" && (
            <PrivateRoute
              exact
              path="/reminder"
              component={Reminder}
            ></PrivateRoute>
          )}

          <PrivateRoute exact path="/room" component={ChatRoom}></PrivateRoute>
          <PrivateRoute exact path="/join/name" component={Name}></PrivateRoute>
          <PrivateRoute exact path="/join" component={Join}></PrivateRoute>

          <PrivateRoute
            exact
            path="/find-doctor"
            component={Doctor}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/tnc-smarthealth"
            component={Tnc}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/doctor/:id"
            component={Doctorz}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/profile"
            component={Profile}
          ></PrivateRoute>
          {data.role === "user" && (
            <PrivateRoute
              exact
              path="/schedule"
              component={Schedule}
            ></PrivateRoute>
          )}

          <Route exact path="/signin" component={SignIn}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route
            exact
            path="/forgot-password"
            component={ForgotPassword}
          ></Route>

          <Route component={Error}></Route>
        </Switch>
      </AuthProvider>

      <Footer></Footer>
    </>
  );
};

export default App;
