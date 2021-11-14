import styles from "./Forms.module.css"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Validations from "./Validations";
import AuthService from "./AuthService";
import { useState, useRef } from "react";

function LoginForm(props) {
    const form = useRef();
    const checkBtn = useRef();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

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
            () => {
              props.history.push("/home");
              window.location.reload();
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
            <button className={styles.formSubmitButton} disabled={loading}>
                {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                )}
                LOGIN
            </button>
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
    );
}

export default LoginForm;