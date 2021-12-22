import styles from "./Profile.module.css";
import { Row, Col } from "react-bootstrap";
import { dates, months, years, countries } from "../../constants";

const Profile = () => {
  return (
    <div className={styles.profileContainer}> 

      <div className={styles.sectionContainer}>
        <div className={styles.sectionTitle}>
          Profile
        </div>
        <Row>
          <Col className={styles.photoContainer}>
            <div className={styles.emptyPhoto}><span>Photo</span></div>
            <div className={styles.uploadContainer}>
              <label className={styles.photoUpload}>
                <input type="file" name="profileImage" accept="image/*"></input>
                Change Photo
              </label>
            </div>
          </Col>
          <Col className={styles.infoContainer}>
            <p>First Name</p>
            <input className={styles.inputField} placeholder="First Name"/>
            <p>Last Name</p>
            <input className={styles.inputField} placeholder="Last Name"/>
            <p>I Am</p>
            <select className={styles.inputField}>
              <option>Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <p>Date of Birth</p>
            <div className={styles.sameRowContainer}>
              <select className={styles.smallInputField}>
                <option>DD</option>
                {dates.map((date) => <option>{date}</option>)}
              </select>
              <select className={styles.smallInputField}>
                <option>MM</option>
                {months.map((month) => <option>{month}</option>)}
              </select>
              <select className={styles.smallInputField}>
                <option>YYYY</option>
                {years.map((year) => <option>{year}</option>)}
              </select>
            </div>
            <p>Phone Number</p>
            <input className={styles.inputField} placeholder="Phone Number"/>
            <p>Email Address</p>
            <input className={styles.inputField} placeholder="Email Address"/>
          </Col>
        </Row>
      </div>

      <div className={styles.sectionContainer}>
        <div className={styles.sectionTitle}>
          Credit Card
        </div>
        <div className={styles.rightAlignContainer}>
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
              <option>DD</option>
              {dates.map((date) => <option>{date}</option>)}
            </select>
            <select className={styles.smallInputField}>
              <option>MM</option>
              {months.map((month) => <option>{month}</option>)}
            </select>
            <input className={styles.smallInputField} placeholder="CVC/CVV"/>
          </div>
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
            <option>Country</option>
            {countries.map((country) => <option>{country}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.saveButton}>SAVE INFO&ensp;{">"}</button>
      </div>

    </div>
  );
};

export default Profile;
