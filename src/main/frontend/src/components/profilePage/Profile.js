import styles from "./Profile.module.css";
import { Row, Col } from "react-bootstrap";
import { dates, months, years, countries } from "../../constants";
import { useState } from "react";
import AuthService from "../loginAndRegistration/AuthService";

const Profile = () => {

  const [paymentMethod, setPaymentMethod] = useState("card");

  const user = AuthService.getCurrentUser();
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender ? user.gender : null);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth ? user.dateOfBirth : "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber ? user.phoneNumber : "");
  const [photo, setPhoto] = useState(user.photo ? user.photo : "");

  const onChangeInput = (e, setter) => {
    const newValue = e.target.value;
    setter(newValue);
  };

  const updateUserInfo = () => {
    console.log(user.id, name, surname, email);
    AuthService.update(user.id, name, surname, email);
  };

  return (
    <div className={styles.profileContainer}> 

      <div className={styles.sectionContainer}>
        <div className={styles.sectionTitle}>
          Profile
        </div>
        <Row>
          <Col className={styles.photoSection}>
            <div className={styles.photoContainer}>
              {(photo.length > 0) ? <img className={styles.photoContainer} src={photo}></img> : <span>Photo</span>}
            </div>
            <div className={styles.uploadContainer}>
              <label className={styles.photoUpload}>
                <input type="file" name="profileImage" accept="image/*"></input>
                Change Photo
              </label>
            </div>
          </Col>
          <Col className={styles.infoContainer}>
            <p>First Name</p>
            <input className={styles.inputField} placeholder="First Name" value={name} onChange={e => onChangeInput(e, setName)}/>
            <p>Last Name</p>
            <input className={styles.inputField} placeholder="Last Name" value={surname} onChange={e => onChangeInput(e, setSurname)}/>
            <p>I Am</p>
            <select className={styles.inputField} onChange={e => onChangeInput(e, setGender)} value={gender}>
              <option disabled selected hidden>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <p>Date of Birth</p>
            <div className={styles.sameRowContainer}>
              <select className={styles.smallInputField} value={(dateOfBirth.length > 0) ? (parseInt(dateOfBirth.substr(8,2))+1) : null}>
                <option disabled selected hidden>DD</option>
                {dates.map((date) => <option>{date}</option>)}
              </select>
              <select className={styles.smallInputField} value={(dateOfBirth.length > 0) ? ((dateOfBirth.substr(5,1) == 0) ? dateOfBirth.substr(6,1) : dateOfBirth.substr(5,2)) : null}>
                <option disabled selected hidden>MM</option>
                {months.map((month) => <option>{month}</option>)}
              </select>
              <select className={styles.smallInputField} value={(dateOfBirth.length > 0) ? dateOfBirth.substr(0,4) : null}>
                <option disabled selected hidden>YYYY</option>
                {years.map((year) => <option>{year}</option>)}
              </select>
            </div>
            <p>Phone Number</p>
            <input className={styles.inputField} placeholder="Phone Number" value={phoneNumber} onChange={e => onChangeInput(e, setPhoneNumber)}/>
            <p>Email Address</p>
            <input className={styles.inputField} placeholder="Email Address" value={email} onChange={e => onChangeInput(e, setEmail)}/>
          </Col>
        </Row>
      </div>

      <div className={styles.sectionContainer}>
        <div className={styles.sectionTitle}>
          Payment Information
        </div>
        <div className={styles.rightAlignContainer}>
          <div className={styles.radioButtonContainer}>
            <input checked={paymentMethod === "paypal"} type="radio" value="paypal" name="paypal" onChange={() => setPaymentMethod("paypal")}/> &ensp; PayPal
          </div>
          <div className={styles.radioButtonContainer}>
            <input checked={paymentMethod === "card"} type="radio" value="card" name="card" onChange={() => setPaymentMethod("card")}/> &ensp; Credit Card
          </div>
          { (paymentMethod === "card") ? 
          <div>
            <p>Name on Card</p>
            <input className={styles.inputField} placeholder="Name on Card"/>
            <p>Card Number</p>
            <input className={styles.inputField} placeholder="Card Number"/>
            <div className={styles.cardLabelsContainer}>
              <p>Expiration Date</p>
              <p>CVC/CVV</p>
            </div>
            <div className={styles.sameRowContainer}>
              <select className={styles.smallInputField}>
                <option disabled selected hidden>DD</option>
                {dates.map((date) => <option>{date}</option>)}
              </select>
              <select className={styles.smallInputField}>
                <option disabled selected hidden>MM</option>
                {months.map((month) => <option>{month}</option>)}
              </select>
              <input className={styles.smallInputField} placeholder="CVC/CVV"/>
            </div>
          </div> : 
          <div>
            <p>PayPal Email Address</p>
            <input className={styles.inputField} placeholder="PayPal Email Address"/>
          </div>}
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <div className={styles.sectionTitle}>
          Address
        </div>
        <div className={styles.rightAlignContainer}>
          <p>Street</p>
          <input className={styles.inputField} placeholder="Street"/>
          <div className={styles.cityLabelsContainer}>
            <p>City</p>
            <p>Zip Code</p>
          </div>
          <div className={styles.sameRowContainer}>
            <input className={styles.mediumInputField} placeholder="City"/>
            <input className={styles.mediumInputField} placeholder="Zip Code"/>
          </div>
          <p>State</p>
          <input className={styles.inputField} placeholder="State"/>
          <p>Country</p>
          <select className={styles.inputField}>
            <option disabled selected hidden>Country</option>
            {countries.map((country) => <option>{country}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.saveButton} onClick={updateUserInfo}>SAVE INFO&ensp;{">"}</button>
      </div>

    </div>
  );
};

export default Profile;
