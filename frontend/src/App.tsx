import { useState, useEffect } from "react";
import LoginModal from "./components/LoginModal";
import Navbar from "./components/Navbar";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/user";
import * as NotesApi from "./network/notes_api";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";

// App component manages the logged-in user state and renders different views based on the user's authentication status.
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  // controls the visibility of signup and login modals
  const [showSignUpModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // fetch the logged-in user when the component mounts.
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        //console.error(error);
        setLoggedInUser(null);
      }
    };
    fetchLoggedInUser();
  }, []);

  return (
    <div className="container">
      <Navbar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignupModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
      </>
      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => setShowSignupModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignupModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
