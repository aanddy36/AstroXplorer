import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./features/Layout";
import { Home } from "./pages/Home";
import { Tours } from "./pages/Tours";
import { About } from "./pages/About";
import { SpecificTour } from "./pages/SpecificTour";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { LogIn } from "./pages/LogIn";
import { ScrollToTop } from "./features/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tours" element={<Tours />} />
          <Route path="tours/:id" element={<SpecificTour />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
