import "./App.css";
import ArticlesDetailPage from "./pages/articleDetail/ArticlesDetailPage";
import HomePage from "./pages/home/HomePage";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/register/RegisterPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="blog/:slug" element={<ArticlesDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
