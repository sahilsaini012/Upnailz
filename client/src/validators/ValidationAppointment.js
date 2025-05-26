export const validateNewAppointment = (values) => {
  const errors = {};

  // Naam validatie
  if (!values.name) {
    errors.name = "Naam is verplicht.";
  }

  // Telefoonnummer validatie
  if (!values.phone_number) {
    errors.phone_number = "Telefoonnummer is verplicht.";
  } else if (!/^\d{10}$/.test(values.phone_number)) {
    errors.phone_number = "Telefoonnummer moet exact 10 cijfers bevatten.";
  }

  // E-mail validatie
  if (!values.email) {
    errors.email = "E-mailadres is verplicht.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Ongeldig e-mailadres.";
  }

  // Afspraakdatum validatie
  if (!values.appointment_on) {
    errors.appointment_on = 'Afspraak is verplicht'; // Dutch validation message
  } else {
    const selectedDate = new Date(values.appointment_on);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set the current date to 00:00:00 to ignore the current time for comparison
  
    if (selectedDate < currentDate) {
      errors.appointment_on = 'Afspraak kan niet in het verleden zijn'; // Dutch validation message for past date
    }
  }
  // Tijd validatie
  if (!values.time) {
    errors.time = "Tijd is verplicht.";
  } else {
    const currentTime = new Date();
    const appointmentDate = new Date(values.appointment_on);
    const [appointmentHour, appointmentMinute] = values.time.split(":").map(Number);
  
    // Controleer of de afspraak op dezelfde dag is en binnen 1 uur vanaf nu
    if (appointmentDate.toDateString() === currentTime.toDateString()) {
      const oneHourFromNow = new Date(currentTime.getTime() + 60 * 60 * 1000); // 1 hour from now
  
      // Create the appointment time from the selected appointment hour and minute
      const appointmentTime = new Date(appointmentDate.setHours(appointmentHour, appointmentMinute, 0, 0));
  
      // Ensure that if it's today's date, the selected time must be at least 1 hour ahead of the current time
      if (appointmentTime <= oneHourFromNow) {
        errors.time = "De afspraak moet minimaal 1 uur vanaf nu zijn.";
      }
    }
  
    // Controleer of de afspraak binnen de werkuren valt (9:00 - 18:00)
    if (
      appointmentHour < 9 ||
      appointmentHour > 17 ||
      (appointmentHour === 17 && appointmentMinute > 59)
    ) {
      errors.time = "Afspraak moet tussen 09:00 en 18:00 zijn.";
    }
  }
  
  // Behandeling validatie
  if (!values.treatment) {
    errors.treatment = "Behandeling is verplicht.";
  }
  
  return errors;
}  

export const validateUpdateAppointment = values => {
  const errors = {};

  if (!values.name) {
    errors.name = "Naam is verplicht.";
  }

  if (!values.phone_number) {
    errors.phone_number = "Telefoonnummer is verplicht.";
  } else if (!/^\d{10}$/.test(values.phone_number)) {
    errors.phone_number = "Voer een geldig telefoonnummer in (10 cijfers).";
  }

  if (!values.email) {
    errors.email = "E-mailadres is verplicht.";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = "Voer een geldig e-mailadres in.";
  }

  return errors;
};
