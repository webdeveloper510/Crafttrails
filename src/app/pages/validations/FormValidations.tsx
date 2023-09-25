/* eslint-disable */
export default function validate(value: any) {
    let errors: any = {};
  
    // Loteo Error
    if (value.email == '') {
      errors.email = `Email is Required`;
    }
    if (value.otp == '') {
      errors.email = `OTP is required`;
    }
    if (value.password == '') {
      errors.password = `Password is required`;
    }
    if (value.confirm_password == '') {
      errors.confirm_password = `Confirm Password is required`;
    }
  
    return errors;
  };