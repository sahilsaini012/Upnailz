import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../services/FormContainer';
import InputField from '../loginpagecontainer/InputField';
import ErrorMessage from '../loginpagecontainer/ErrorMessage';
import { validateResetPasswordForm } from '../validators';
import { toast } from 'react-toastify';
import { forResetPassword } from '../services/Auth';
import { urlPrefix } from '../helpers/Common';

const ResetPassword = () => {
    const navigate=useNavigate();
    const {token} = useParams();
    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword:"",
        },
        validate:validateResetPasswordForm,

        onSubmit: async (values) => { 
            // alert("Okkkkkkkkkkkkk")  
            try {
         
                const response=await forResetPassword({...values,token})
                // alert("Okkkkkkkkkkkkk") 
                if(response){
                    toast.success("Password Reset Sucessfully");
                    navigate(urlPrefix() + "/login")
                }    
            } catch (error) {
                toast.error("Error in password changing");
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
                        <h4>reset uw wachtwoord</h4>
                        <div className="login-form">
                            <form onSubmit={formik.handleSubmit}>
                                {/* Email Input */}
                                <div className="input-outer-layout">
                                    <div className="input-field-container">
                                        <InputField
                                            type="text"
                                            name="newPassword"
                                             placeholder="wachtwoord invoeren"
                                            value={formik.values.newPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`form-control ${formik.touched.password &&
                                                formik.errors.newPassword ? 'error' : ''
                                                }`}
                                        />
                                        <div className="line" />
                                    </div>
                                </div>
                                {formik.touched.newPassword && formik.errors.newPassword&&(
                                    <ErrorMessage>{formik.errors.newPassword}</ErrorMessage>
                                )}
                                        <div className="input-outer-layout">
                                    <div className="input-field-container">
                                        <InputField
                                            type="text"
                                            name="confirmPassword"
                                             placeholder="bevestig wachtwoord"
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`form-control ${formik.touched.confirmPassword &&
                                                formik.errors.confirmPassword? 'error' : ''
                                                }`}
                                        />
                                        <div className="line" />
                                    </div>
                                </div>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword&&(
                                    <ErrorMessage>{formik.errors.confirmPassword}</ErrorMessage>
                                )}
                                <p>
                                    Wilt u inloggen? <Link to="/">Klik hier</Link>
                                </p>

                                {/* Submit Button */}
                                <button type="submit" className="let-op-btn">
                                reset uw wachtwoord
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </FormContainer>
    );
};

export default ResetPassword;
