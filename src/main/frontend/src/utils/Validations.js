import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
  
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
  
const validPassword = (value) => {
  if (value.length < 8 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 8 and 20 characters.
     </div>
    );
  }
};

const validName = (value) => {
  const validateName = new RegExp("^[\\w\\sčšđćž]+$");
  if (!validateName.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Names cannot contain any special characters.
     </div>
    );
  }
};

export default {
  required,
  validEmail,
  validPassword,
  validName
};
