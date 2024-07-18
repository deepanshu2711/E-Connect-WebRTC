import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/LandingPage";
import MainLayout from "./components/layout/mainLayout";
import { WebSocketProvider } from "./provider/webSocketProvider";
import SenderRoom from "./pages/SenderRoom";
import ReceiverRoom from "./pages/ReceiverRoom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/DashboardPage";
import { CurrentUserProvider } from "./provider/currentUserProvider";
import { PrivateRoute } from "./components/privateRoute";
function App() {
  return (
    <CurrentUserProvider>
      <WebSocketProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route
                path="/dashboard"
                element={
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                }
              />
              <Route
                path="dashboard/room/sender/:roomId"
                element={<SenderRoom />}
              />
              <Route
                path="dashboard/room/receiver/:roomId"
                element={<ReceiverRoom />}
              />
            </Route>
            <Route path="/" element={<Landing />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </WebSocketProvider>
    </CurrentUserProvider>
  );
}

export default App;
