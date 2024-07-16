import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/LandingPage";
import MainLayout from "./components/layout/mainLayout";
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
