import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        his field is required!
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
  
const vpassword = (value) => {
  if (value.length < 8 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 8 and 20 characters.
     </div>
    );
  }
};

export default {
  required,
  validEmail,
  vpassword
};
