import { useContext } from "react";
import { AuthContext } from "../components/loginAndRegistration/AuthContext.js";
import Profile from "../components/loginAndRegistration/Profile.js"

function Account(){
    const { loggedIn } = useContext(AuthContext);
    return (
        <div>
            {loggedIn ? <Profile/> : <p>You are not logged in!</p>}
        </div>
    );
}

export default Account;
