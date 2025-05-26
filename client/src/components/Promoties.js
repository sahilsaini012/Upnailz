import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import LogoutAppointment from './LogoutAppointment';
import { toast } from 'react-toastify';
import { addPromoties, getCustomerEmails } from '../services/Auth';
import { useFormik } from 'formik';
import validatePromoties from '../validators/ValidationPromoties';
import ErrorMessage from '../loginpagecontainer/ErrorMessage';

const Promoties = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selecteduserId, setSelectedUserId] = useState(null);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation(); // Get the current path
  const [message, setMessage] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let x = location?.state?.selectedUsers
    if (location.state && x) {

      setSelectedUsers(x);
    }

  }, [location]);


  const formik = useFormik({
    initialValues: {
      email: "",
      subject: "",
      message: "",
    },

    validate: validatePromoties,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const emailList = Array.isArray(values.email) ? values.email : [values.email];

      console.log("Sending emails to:", emailList);
      try {
        // alert(JSON.stringify(values))
        const response = await addPromoties(values);
        if (response) {
          resetForm();
          toast.success("Message Send Successfully")
        }
      } catch (error) {
        toast.warn("not successfull")
      } finally {
        setLoading(false);
      }
    }
  })

  const fetchEmails = async () => {
    try {
      if (selectedUsers.length > 0) {
        console.log("Fetched Emails:");
        const result = await getCustomerEmails(selectedUsers);
        formik.setFieldValue("email", result.emails)
        console.log("Fetched Emails:", result.emails);
      }


    } catch (error) {
      console.error("Error:", error.message);
    }
  };


  useEffect(() => {
    setActiveLink(location.pathname);

  }, [location]);

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };

  const handleActiveLink = (link) => {
    setActiveLink(link); // Update the active link when clicked
  };




  useEffect(() => {
    fetchEmails()
  }, [selectedUsers]);

  return (
    <>
      <Helmet>
        <title>Promoties</title>
      </Helmet>
      <header className="afspra-header">
        <div className="logo-section">
          <Link to="/afspraken">
            <img src="/images/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="right-section">
          <div className="tab-section">
            <ul>
              <li className={activeLink === "/afspraken" ? "active" : ""}>
                <Link
                  to="/afspraken"
                  onClick={() => handleActiveLink("/afspraken")}
                >
                  Afspraken
                </Link>
              </li>
              <li className={activeLink === "/klanten" ? "active" : ""}>
                <Link
                  to="/klanten"
                  onClick={() => handleActiveLink("/klanten")}
                >
                  Klanten
                </Link>
              </li>
              <li className={activeLink === "/promoties" ? "active" : ""}>
                <Link
                  to="/promoties"
                  onClick={() => handleActiveLink("/promoties")}
                >
                  Promoties
                </Link>
              </li>
            </ul>
          </div>

          <div className="img-section">
            <img src="/images/Kim.jpg"
              alt="Profile"
              style={{
                borderRadius: '50%', display: 'block', margin: '0 auto',
              }} />

            {/* Conditionally render profile and logout buttons only if the dialog is not open */}
            {!isDialogOpen && (
              <div className="profile-info">
                {/* <Link to="/profile">Profile</Link> */}
                {/* <Link to="#" onClick={openDialog} >Logout</Link> Trigger dialog on click */}
                <button data-bs-toggle="modal" data-bs-target="#exampleModal-55" style={{ cursor: 'pointer' }}>Uitloggen</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="afspra-banner">
        <div className="tab-content">
          <div className="tab-content-top">
            <div className="tab-title">
              <h4>Promoties</h4>
            </div>
          </div>

          <div className="tab-content-bottom promoties">
            <h5>Promoties</h5>
            <div className="form-content-outer">
              <form onSubmit={formik.handleSubmit}>
                {selectedUsers.length == 0 && (

                  <div className="form-cont">
                    <label>E-mailadres:</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Vul uw e-mailadres in"
                      className="form-controls"
                      onChange={(e) => {
                        const inputValue = e.target.value.trim();

                        if (selectedUsers?.length > 0) {
                          // ✅ If users are selected, allow multiple emails but also allow manual input
                          const emailsArray = formik.values.email && Array.isArray(formik.values.email)
                            ? [...formik.values.email, inputValue] // Append new email
                            : [inputValue]; // Start new array if empty

                          formik.setFieldValue("email", emailsArray);
                        } else {
                          // ✅ Allow manual entry of a single email
                          formik.setFieldValue("email", inputValue);
                        }
                      }}
                      value={
                        Array.isArray(formik.values.email) ? formik.values.email.join(" ") : formik.values.email
                      }
                    />
                    {formik.errors.email && <ErrorMessage>{formik.errors.email}</ErrorMessage>}
                  </div>
                )}

                <div className="form-cont">
                  <label>Onderwerp:</label>
                  <input type="text"
                    name='subject'
                    placeholder="Onderwerp"
                    className="form-controls"
                    onChange={formik.handleChange}
                    value={formik.values.subject} />
                  {formik.errors.subject ? (
                    <ErrorMessage>{formik.errors.subject}</ErrorMessage>
                  ) : null}
                </div>

                <div className="form-cont">
                  <label>Bericht:</label>
                  <textarea
                    className="textarea"
                    name="message"
                    rows="10"
                    cols="30"
                    placeholder="Schrijf je bericht"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.message ? (
                    <ErrorMessage>{formik.errors.message}</ErrorMessage>
                  ) : null}
                </div>

                <div className="form-cont-button">
                  <button
                    type="submit"
                    className="let-op-btn"
                  > {loading ? "Bericht verzenden...!" : "Opslaan"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>


        {/* {Logout popup} */}
        <LogoutAppointment
          id={selecteduserId}
          onClose={handleCloseModal}
        ></LogoutAppointment>
        <footer>
          <p>© 2025 UpNailz. Alle rechten voorbehouden</p>
        </footer>
      </div>
    </>
  );
};

export default Promoties;
