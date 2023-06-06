interface NavbarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavbarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavbarLoggedOutViewProps) => {
  
  return (
    <>
      <button onClick={onSignUpClicked}>Sign Up</button>
      <button onClick={onLoginClicked}>Log In</button>
    </>
  );
};

export default NavbarLoggedOutView;
