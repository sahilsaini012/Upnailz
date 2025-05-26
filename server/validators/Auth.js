const { checkSchema } = require("express-validator");
const db = require("../db/index");

const LoginValidate = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Invalid email format",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
    matches: {
      options: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
      errorMessage:
        "Password must contain at least one uppercase letter, one number, and one special character",
    },
  },
});

const AppointmentValidate = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "Name is Required",
    },
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: "Name must be between 2 and 50 characters",
    },
  },
  phone_number: {
    notEmpty: {
      errorMessage: "Phone number is Required",
    },
    isMobilePhone: {
      options: ["any"],
      errorMessage: "Invalid Phone number format",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Email is Required",
    },
    isEmail: {
      errorMessage: "Invalid Email Format",
    },
  },
})
  // appointment_on: {
  //   notEmpty: {
  //     errorMessage: "Appointment date is required",
  //   },
  //   isDate: {
  //     errorMessage: "Invalid appointment date format",
  //   },
  // },
  // time: {
  //   notEmpty: {
  //     errorMessage: "Time is Required",
  //   },
  // },
  // treatment: {
  //   notEmpty: {
  //     errorMessage: "Treatment is required",
  //   },
  //   isIn: {
  //     options: [
  //       [
  //         "Gelpolish + rubberbase",
  //         "nagels opvullen",
  //         "French manicure",
  //         "Gel polish",
  //         "Nagels",
  //         "opvullen next gel",
  //       ],
  //     ],
  //     errorMessage:
  //       "Treatment must be one of: Gelpolish + rubberbase , nagels opvullen , French manicure, Gel polish,Nagels, opvullen next gel",
  //   },
//   },
// });

const PasswordValidation = checkSchema({
  newPassword: {
    notEmpty: {
      errorMessage: " New Password is required",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters long",
    },
    matches: {
      options: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
      errorMessage:
        "Password must contain  letter, number, and at least one special character",
    },
  },
  confirmPassword: {
    notEmpty: {
      errorMessage: "Confirm password is required",
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("Passwords do not match");
        }
        return true;
      },
    },
  },
});

module.exports = {
  LoginValidate,
  AppointmentValidate,
  PasswordValidation,
};
