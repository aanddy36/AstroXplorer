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
import { WrongPage } from "./pages/WrongPage";
import { Overview } from "./features/Overview";
import { Itinerary } from "./features/Itinerary";
import { MeetingPoint } from "./features/MeetingPoint";
import { Dates } from "./features/Dates";
import { ReviewsTour } from "./features/ReviewsTour";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<WrongPage />} />
          <Route index element={<Home />} />
          <Route path="tours" element={<Tours />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tours/:id" element={<SpecificTour />}>
            <Route index element={<Overview/>}/>
            <Route path="itinerary" element={<Itinerary/>}/>
            <Route path="meeting" element={<MeetingPoint/>}/>
            <Route path="dates" element={<Dates/>}/>
            <Route path="reviews" element={<ReviewsTour/>}/>
          </Route>
        </Route>
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
