import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../services/FormContainer';
import InputField from '../loginpagecontainer/InputField';
import ErrorMessage from '../loginpagecontainer/ErrorMessage';
import { validateForgotPasswordForm } from '../validators';
import { toast } from 'react-toastify';
import { forForgotPassword } from '../services/Auth';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "", // The email/username field
        },
        validate: validateForgotPasswordForm,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await forForgotPassword(values);
                if (response) {
                    toast.success("Mail send to your G-mail");
                    resetForm();
                    // alert('Navigating to reset-password page');
                }
            } catch (error) {
                toast.error("Failed to send link");
            }
        },
    });

    return (
        <FormContainer>
            <div className="login-section">
                <div className="login-section-inner">
                    <div className="login-logo-section">
                        <div className="logo-img">
                            <a href="">
                                <img src="/images/login-form-logo.png" alt="Logo" />
                            </a>
                        </div>
                        <div className="logo-content">
                            <h3>Mijn afspraken overzicht</h3>
                        </div>
                    </div>
                    <div className="login-form-outer">
                        <h4>Wachtwoord vergeten?</h4>
                        <div className="login-form">
                            <form onSubmit={formik.handleSubmit}>
                                {/* Email Input */}
                                <div className="input-outer-layout">
                                    <div className="input-field-container">
                                        <InputField
                                            type="email"
                                            name="email"
                                            placeholder="Je gebruikersnaam:"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`form-control ${formik.touched.email &&
                                                formik.errors.email ? 'error' : ''
                                                }`}
                                        />
                                        <div className="line" />
                                    </div>
                                </div>
                                {formik.touched.email && formik.errors.email && (
                                    <ErrorMessage>{formik.errors.email}</ErrorMessage>
                                )}
                                <p>
                                    Wilt u inloggen? <Link to="/">Klik hier</Link>
                                </p>
                                <p>

                                </p>

                                {/* Submit Button */}
                                <button type="submit" className="let-op-btn">
                                    Stuue Reset-Link
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </FormContainer>
    );
};

export default ForgotPassword;
