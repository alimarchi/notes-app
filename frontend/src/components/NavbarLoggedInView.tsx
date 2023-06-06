import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";

interface NavbarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavbarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavbarLoggedInViewProps) => {
  const logout = async () => {
    try {
      await NotesApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <>
      <h3>Signed in as: {user.username}</h3>
      <button onClick={logout}>Log out</button>
    </>
  );
};

export default NavbarLoggedInView;
