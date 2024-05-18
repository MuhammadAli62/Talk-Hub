import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "./authContext"
import SignIn from "./pages/sign_in/signin"
import SignUp from "./pages/sign_up/signup"
import Home from "./pages/Home/Home"
function App() {

  const { currentUser } = useContext(AuthContext)

  const ProtactedRotes = ({ children }) => {

    if (!currentUser) {
      return <Navigate to="/signin" />
    }
    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
            <ProtactedRotes>
              <Home />
            </ProtactedRotes>
          } />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
