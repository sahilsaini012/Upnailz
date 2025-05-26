    import React, { useEffect, useState } from "react";
    import { useFormik } from "formik";
    import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons for password visibility toggle
    import { Link, useNavigate } from "react-router-dom";
    import { toast, ToastContainer } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import FormContainer from "../services/FormContainer";
    import InputField from "../loginpagecontainer/InputField"; // Custom styled InputField
    import ErrorMessage from "../loginpagecontainer/ErrorMessage";
    import { Helmet } from "react-helmet";
    import { useAuth } from "../context/AuthContext";
    import { validateLoginForm } from "../validators";
    import { login } from "../services/Auth";


    const LoginForm = () => {
      const [showPassword, setShowPassword] = useState(false);
      const navigate = useNavigate();
      const { UserLogin, isLoggedIn } = useAuth();
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validate: validateLoginForm,
        onSubmit: async (values) => {
          try {
            let result = await login(values);
            if (result) {
              UserLogin(result.token); // Assuming this stores the token
              // toast.success("Login successfully");
              navigate("/afspraken");
            }
          } catch (error) {
            toast.error("Invalid Username or Password. Please try again.");
          }
          // console.log("Form submitted successfully:", values);
        }
      })
      useEffect(() => {
        if (isLoggedIn) {
          navigate("/afspraken");
        } else {
          navigate("/login")
        }
      }, [isLoggedIn, navigate])

      return (
        <div>
          {!isLoggedIn && (
            <FormContainer>
              <Helmet>
                <title>Login -Up Nailz</title>
              </Helmet>
              <div className="login-section">
                <div className="login-section-inner">
                  <div className="login-logo-section">
                    <div className="logo-img">
                      <a href="">
                        <img src="/images/login-form-logo.png" alt="" />
                      </a>
                    </div>
                    <div className="logo-content">
                      <h3>Mijn afspraken overzicht</h3>
                    </div>
                  </div>

                  <div className="login-form-outer">
                    <h4>Welkom terug!</h4>
                    <div className="login-form">
                      <form onSubmit={formik.handleSubmit}>
                        {/* Email Input */}
                        <div className="input-outer-layout">
                          <div className="input-field-container">
                            <InputField
                              type="email"
                              name="email"
                              placeholder="Je gebruikersnaam"
                              value={formik.values.email}
                              onChange={(e) => {
                                formik.handleChange(e);  // Update the form field value
                                formik.validateField(e.target.name); // Trigger validation for this specific field
                              }}
                              className={`input-line ${formik.touched.email && formik.errors.email ? "error" : ""}`}
                            />
                            {formik.touched.email && formik.errors.email ? (
                              <ErrorMessage>{formik.errors.email}</ErrorMessage>
                            ) : null}
                          </div>



                          {/* Password Input */}
                          <div className="password-field-container" style={{ position: "relative" }}>
                            <InputField
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder="Je wachtwoord"
                              value={formik.values.password}
                              onChange={(e) => {
                                formik.handleChange(e);  // Update the form field value
                                formik.validateField(e.target.name); // Trigger validation for the password field
                              }}
                              className={`input-line ${formik.touched.password && formik.errors.password ? "error" : ""}`}
                            />
                            <span
                              className="eye-icon"
                              onClick={togglePasswordVisibility}
                              style={{
                                cursor: "pointer",
                                position: "absolute",
                                right: "10px",
                                top: "12px",
                              }}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {formik.touched.password && formik.errors.password ? (
                              <ErrorMessage>{formik.errors.password}</ErrorMessage>
                            ) : null}
                          </div>
                          </div>

                          {/* Forgot Password Link */}
                          <p>
                            Wachtwoord vergeten?{" "}
                            <Link to="/forgot-password">Direct aanpassen</Link>
                          </p>

                          {/* Submit Button */}
                          <button type="submit" className="let-op-btn">
                            Inloggen
                          </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </FormContainer>
          )}
        </div>
      );
    };

    export default LoginForm;
 