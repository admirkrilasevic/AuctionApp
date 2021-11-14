import styles from "./Forms.module.css"
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "./AuthService";
import Validations from "./Validations"
import { useState, useRef } from "react";

function RegisterForm(props) {
    const form = useRef();
    const checkBtn = useRef();
  
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
  
    const onChangeName = (e) => {
      const name = e.target.value;
      setName(name);
    };

    const onChangeSurname = (e) => {
        const surname = e.target.value;
        setSurname(surname);
      };
  
    const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();
    
        setMessage("");
        setSuccessful(false);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
          AuthService.register(name, surname, email, password).then(
            (response) => {
              setMessage(response.data);
              setSuccessful(true);
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              setMessage(resMessage);
              setSuccessful(false);
            }
          );
        }
      };

    return (
        <Form className={styles.formContainer} onSubmit={handleRegister} ref={form}>
            {!successful && (
                <div>
                    <div className={styles.formTitle}>
                        <p>REGISTER</p>
                    </div>
                    <div className={styles.formSection}>
                        <p>First Name</p>
                        <Input 
                            className={styles.formInput}
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChangeName}
                            validations={[Validations.required]}
                        />
                    </div>
                    <div className={styles.formSection}>
                        <p>Last Name</p>
                        <Input 
                            className={styles.formInput}
                            type="text"
                            name="surname"
                            value={surname}
                            onChange={onChangeSurname}
                            validations={[Validations.required]}
                        />
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
                            validations={[Validations.required, Validations.vpassword]}
                        />
                    </div>
                    <button className={styles.formSubmitButton}>REGISTER</button>
                    <p className={styles.alreadyHaveAnAccount}>Already have an account? <Link className={styles.linkToLogin} to="/login">Login</Link></p>
                </div>
            )}
            {message && (
                <div className="form-group">
                    <div
                        className={ successful ? "alert alert-success" : "alert alert-danger" }
                        role="alert"
                    >
                        {message}
                    </div>
                </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
    );
}

export default RegisterForm;