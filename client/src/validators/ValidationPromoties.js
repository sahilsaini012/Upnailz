const validatePromoties = (values) => {
    const errors = {};
  
    // E-mail validatie
    if (!values.email) {
      errors.email = "E-mailadres is verplicht";
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    //   errors.email = "Ongeldig e-mailadres";
    }
  
    // Onderwerp validatie
    if (!values.subject) {
      errors.subject = "Onderwerp is verplicht";
    } else if (values.subject.length < 3) {
      errors.subject = "Onderwerp moet minstens 3 tekens bevatten";
    }
  
    // Bericht validatie
    if (!values.message) {
      errors.message = "Bericht is verplicht";
    } else if (values.message.length < 10) {
      errors.message = "Bericht moet minstens 10 tekens bevatten";
    }
  
    return errors;
  };
  
  export default validatePromoties;
  