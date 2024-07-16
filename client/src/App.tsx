import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/LandingPage";
import MainLayout from "./components/layout/mainLayout";
import { WebSocketProvider } from "./provider/webSocketProvider";
import SenderRoom from "./pages/SenderRoom";
import ReceiverRoom from "./pages/ReceiverRoom";
function App() {
  return (
    <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Landing />
              </MainLayout>
            }
          />
          <Route path="/room/sender/:roomId" element={<SenderRoom />} />
          <Route path="/room/receiver/:roomId" element={<ReceiverRoom />} />
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

export default App;
