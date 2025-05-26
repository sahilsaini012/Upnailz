// validation for loginpage
export const validateLoginForm = values => {
  const errors = {};

  // Validate email (email)
  if (!values.email.trim()) {
    errors.email = "Je gebruikersnaam is vereist";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Voer een geldig e-mailadres in";
  }

  // Validate password (password)
  if (!values.password.trim()) {
    errors.password = "Je wachtwoord is vereist";
  } else if (values.password.length < 8) {
    errors.password = "Wachtwoord moet minimaal 8 tekens lang zijn";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Wachtwoord moet minstens één hoofdletter bevatten";
  } else if (!/[!@#$%^&*]/.test(values.password)) {
    errors.password = "Wachtwoord moet minstens één speciaal teken bevatten";
  }

  return errors;

};


export const validateForgotPasswordForm = values => {
  const errors = {};

  // Validate email/username
  if (!values.email) {
    errors.email = "Gebruikersnaam is verplicht.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Voer een geldig e-mailadres in.";
  }

  return errors;
};

export const validateResetPasswordForm = values => {
  const errors = {};
  if (!values.password.trim()) {
    errors.password = "Je wachtwoord is vereist";
  } else if (values.password.length < 8) {
    errors.password = "Wachtwoord moet minimaal 8 tekens lang zijn";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Wachtwoord moet minstens één hoofdletter bevatten";
  } else if (!/[!@#$%^&*]/.test(values.password)) {
    errors.password = "Wachtwoord moet minstens één speciaal teken bevatten";
  }
  if (!values.confirmpassword.trim()) {
    errors.confirmpassword = "Bevestig je wachtwoord is vereist";
  } else if (values.confirmpassword !== values.password) {
    errors.confirmpassword = "Wachtwoorden komen niet overeen";
  }
}

