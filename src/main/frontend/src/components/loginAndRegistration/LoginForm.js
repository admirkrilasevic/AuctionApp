import styles from "./Forms.module.css"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Validations from "../../utils/Validations";
import AuthService from "../../utils/AuthService";
import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../utils/AuthContext";

function LoginForm() {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const history = useHistory();

  const { setToken } = useContext(AuthContext);

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        (response) => {
          setLoading(false);
          setToken(response.token);
          history.push("/home");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleLogin} ref={form} className={styles.formContainer}>
      <div className={styles.formTitle}>
        <p>LOGIN</p>
      </div>
      <div className={styles.formSection}>
        <p>Enter Email</p>
        <Input 
          className={styles.formInput}
          type="text"
          name="email"
          value={email}
          onChange={onChangeEmail}
          validations={[Validations.required, Validations.validEmail]}
        />
      </div>
      <div className={styles.formSection}>
        <p>Password</p>
        <Input 
          className={styles.formInput}
          type="password"
          name="password"
          value={password}
          onChange={onChangePassword}
          validations={[Validations.required]}
        />
      </div>
      <CheckButton className={styles.formSubmitButton} disabled={loading} ref={checkBtn}>
        {loading && (
          <span className="spinner-border spinner-border-sm"></span>
        )}
        LOGIN
      </CheckButton>
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </Form>
  );
}

export default LoginForm;
