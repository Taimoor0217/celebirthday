import React, { Suspense} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { UserContext } from "./UserContext";
// import ProtectedRoute from './ProtectedRoute';
// import NotFound from "./NotFound";
import LandingPage from "../components/modules/landingPage/LandingPage";
import CreateParty from "../components/modules/initializeParty/CreateParty";
import JoinParty from "../components/modules/initializeParty/JoinParty";
import PartyArena from "../components/modules/partyArena/PartyArena";
import SlideShow from "../components/SlideShow";
const AppRouter = () => {
  // const [user, setUser] = useState({
  //   type: "admin",
  //   language: "en",
  //   isAuthenticated: false
  // });
  // const appContext = useMemo(
  //   () => ({
  //     user,
  //     setUser,
  //   }),
  //   [user, setUser]
  // );

  // useEffect(() => {
  // verifyToken(getAppSecret())
  // .then(res=>{
  //     appContext.setUser({
  //         ...appContext.user,
  //         isAuthenticated: true
  //     })
  // })
  // .catch(err=>{
  //     appContext.setUser({
  //         ...appContext.user,
  //         isAuthenticated: false
  //     })
  // })
  // }, []);
  return (
    <Router>
      <Suspense fallback={<div>loading...</div>}>
        {/* <UserContext.Provider value={appContext}> */}
        <Routes>
          {/* <Route exact path="/menus">
              <Menus />
              </Route>
            <Route exact path="/menu/add">
              <ProtectedRoute Component={AddMenu} />
            </Route>
            <Route exact path="/menu/edit/:menuId">
            <ProtectedRoute Component={AddMenu} EditMode={true} />
            </Route>
            <Route exact path="/login">
            <Login />
            </Route>
            <Route exact path="/">
            <Menus />
          </Route> */}
          <Route exact path="/join" element={<JoinParty />} />
          <Route exact path="/create" element={<CreateParty />} />
          <Route exact path="/party" element={<PartyArena />} />
          <Route exact path="/slideshow" element={<SlideShow />} />
          <Route exact path="/*" element={<LandingPage />} />
        </Routes>
        {/* </UserContext.Provider> */}
      </Suspense>
    </Router>
  );
};
export default AppRouter;
