import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/LandingPage";
import MainLayout from "./components/layout/mainLayout";
import { WebSocketProvider } from "./provider/webSocketProvider";
import SenderRoom from "./pages/SenderRoom";
import ReceiverRoom from "./pages/ReceiverRoom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/DashboardPage";
function App() {
  return (
    <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route path="/" element={<Landing />} />
          <Route path="/room/sender/:roomId" element={<SenderRoom />} />
          <Route path="/room/receiver/:roomId" element={<ReceiverRoom />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

export default App;
