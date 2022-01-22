import { Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import "./App.css";

import DashboardPage from "./pages/dashboard/DashboardPage";
import CreatePage from "./pages/create/CreatePage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import ProjectPage from "./pages/project/ProjectPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AllUsers from "./components/AllUsers";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <>
          {user && <Sidebar />}
          <div className="content">
            <Navbar />
            <Switch>
              <Route exact path="/">
                {user && <DashboardPage />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path="/create">
                {user && <CreatePage />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path="/login">
                {!user && <LoginPage />}
                {user && <Redirect to="/" />}
              </Route>
              <Route path="/signup">
                {!user && <SignupPage />}
                {user && <Redirect to="/" />}
              </Route>
              <Route path="/project/:id">
                {user && <ProjectPage />}
                {!user && <Redirect to="/login" />}
              </Route>
            </Switch>
          </div>
          {user && <AllUsers />}
        </>
      )}
    </div>
  );
}

export default App;
