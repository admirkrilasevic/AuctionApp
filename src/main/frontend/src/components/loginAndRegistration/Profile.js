import AuthService from "./AuthService";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
        {currentUser.token.substr(currentUser.token.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Name:</strong> {currentUser.name}
      </p>
      <p>
        <strong>Surname:</strong> {currentUser.surname}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
    </div>
  );
};

export default Profile;
