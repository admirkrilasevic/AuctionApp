import styles from "./Profile.module.css";
import { Row, Col } from "react-bootstrap";
import { dates, months, years, countries, GENDER } from "../../constants";
import { useState } from "react";
import AuthService from "../loginAndRegistration/AuthService";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { isEmail } from "validator";

const Profile = ({setMessage, setMessageStyle}) => {

  const [paymentMethod, setPaymentMethod] = useState("card");

  const user = AuthService.getCurrentUser();
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender ? user.gender : null);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth ? user.dateOfBirth : "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber ? user.phoneNumber : "");
  const [photo, setPhoto] = useState(user.photo ? user.photo : "");

  const [street, setStreet] = useState(user.address ? user.address.street : "");
  const [city, setCity] = useState(user.address ? user.address.city : "");
  const [zipCode, setZipCode] = useState(user.address ? user.address.zipCode : "");
  const [country, setCountry] = useState(user.address ? user.address.country : null);
  const [state, setState] = useState(user.address ? user.address.state : "");

  const onChangeInput = (e, setter) => {
    const newValue = e.target.value;
    setter(newValue);
  };

  const onChangeDate = (e, type) => {
    const newValue = e.target.value;
    const date = dateOfBirth.substr(8,2);
    const month = dateOfBirth.substr(5,2);
    const year = dateOfBirth.substr(0,4);
    if (type === "date") {
      setDateOfBirth(year+"-"+month+"-"+newValue);
    } else if (type === "month") {
      setDateOfBirth(year+"-"+newValue+"-"+date);
    } else {
      setDateOfBirth(newValue+"-"+month+"-"+date);
    }
  }

  const updateUserInfo = async () => {
    if (name == "" || surname == "" || email == "") {
      setMessage("Following fields cannot be empty: First Name, Last Name, Email Address");
      setMessageStyle(styles.headerMessageError);
      window.scrollTo(0, 0);
    } 
    else if (!isEmail(email)) {
      setMessage("Invalid Email Address");
      setMessageStyle(styles.headerMessageError);
      window.scrollTo(0, 0);
    }
    else if (!isAddressComplete()){
      setMessage("If you wish to add an address, please fill in all the address fields");
      setMessageStyle(styles.headerMessageError);
      window.scrollTo(0, 0);
    }
    else {
      await AuthService.update(user.id, name, surname, email, gender, dateOfBirth, phoneNumber, photo, user.address ? user.address.id : null, street, city, zipCode, state, country);
      setMessage("Information successfully updated");
      setMessageStyle(styles.headerMessageSuccess);
      window.scrollTo(0, 0);
    }
  };

  const isAddressComplete = () => {
    const fields = [street, city, zipCode, state, country];
    const allFieldsAreEmpty = fields.every(field => !field || field.trim() === "");
    const allFieldsAreFilled = fields.every(field => field && field.trim() !== "");
    return allFieldsAreEmpty || allFieldsAreFilled;
  }

  const uploadImage = async (e) => {
    const res = axios.post(
      'https://api.cloudinary.com/v1_1/dtm8an029/image/upload',
      {
        upload_preset: "o1u6dtrg",
        file: e[0].base64
      }
    ).then((response) => {
        setPhoto(response.data.secure_url);
    });
  }

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
                <FileBase64 multiple={true} onDone={uploadImage}/>
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
              <option>{GENDER.MALE}</option>
              <option>{GENDER.FEMALE}</option>
              <option>{GENDER.OTHER}</option>
            </select>
            <p>Date of Birth</p>
            <div className={styles.sameRowContainer}>
              <select className={styles.smallInputField} value={(dateOfBirth.length > 0) ? dateOfBirth.substr(8,2) : null} onChange={e => onChangeDate(e, "date")}>
                <option disabled selected hidden>DD</option>
                {dates.map((date) => <option>{date}</option>)}
              </select>
              <select className={styles.smallInputField} value={(dateOfBirth.length > 0) ? dateOfBirth.substr(5,2) : null} onChange={e => onChangeDate(e, "month")}>
                <option disabled selected hidden>MM</option>
                {months.map((month) => <option>{month}</option>)}
              </select>
              <select className={styles.smallInputField} value={(dateOfBirth.length > 0) ? dateOfBirth.substr(0,4) : null} onChange={e => onChangeDate(e, "year")}>
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
          <input className={styles.inputField} placeholder="Street" value={street} onChange={e => onChangeInput(e, setStreet)}/>
          <div className={styles.cityLabelsContainer}>
            <p>City</p>
            <p>Zip Code</p>
          </div>
          <div className={styles.sameRowContainer}>
            <input className={styles.mediumInputField} placeholder="City" value={city} onChange={e => onChangeInput(e, setCity)}/>
            <input className={styles.mediumInputField} placeholder="Zip Code" value={zipCode} onChange={e => onChangeInput(e, setZipCode)}/>
          </div>
          <p>State</p>
          <input className={styles.inputField} placeholder="State" value={state} onChange={e => onChangeInput(e, setState)}/>
          <p>Country</p>
          <select className={styles.inputField} value={country} onChange={e => onChangeInput(e, setCountry)}>
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
