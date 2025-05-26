import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../loginpagecontainer/ErrorMessage';
import { addUserAppointment, getUsersAppointment } from '../services/Auth';
import { validateNewAppointment } from '../validators/ValidationAppointment'; // Ensure this import is correct
// import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const NewAppointment = () => {
    // const pageReload =()=>{
    //     window.location.reload();
    // }
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalusers, setTotalUsers] = useState(0);
    const [userId, setUserId] = useState(null)


    const formik = useFormik({
        initialValues: {
            name: '',
            phone_number: '',
            email: '',
            appointment_on: '',
            time: '',
            treatment: '',
        },
        validate: validateNewAppointment,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);  // Indicate loading state
            try {
                const response = await addUserAppointment(values);
                if (response) {
                    // toast.success("Appointment added",  
                    // );
                    resetForm();
                    window.location.reload();
                    //  setTimeout(() => {
                    //     window.location.reload();    
                    //   }, 1000);
                }
            } catch (error) {
                //  toast.error("Failed Appointment");
                // toast.error("Failed to a
                // dd appointment");
                // const modalElement = document.getElementById('exampleModal');
                // const modal = bootstrap.Modal.getInstance(modalElement);
                // modal.hide(); // Hide the modal programmatically
            } finally {
                setLoading(false);  // End loading state
            }
        },
    });

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const getUsers = await getUsersAppointment();
                if (getUsers && getUsers.length > 0) {
                    setUsers(getUsers);
                    setTotalUsers(getUsers.totalUsers);
                    // Removed the toast.success line here
                } else {
                    // toast.info("No appointments found.");
                }
            } catch (error) {
                // toast.error("Failed to fetch appointments. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);


    return (
        <div>
            <div
                className="modal fade afpraak"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 id="exampleModalLabel">
                                Nieuwe afspraak inplannen
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => formik.resetForm()} // Reset the form when clicking close
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="popup-form">
                                    <div className="popup-form-cont">
                                        <label className="form-label">Naam van de klant *</label>
                                        <input
                                            type="text"
                                            className="form-controls"
                                            name="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                        />
                                        {formik.errors.name ? (
                                            <ErrorMessage>{formik.errors.name}</ErrorMessage>
                                        ) : null}
                                    </div>
                                    <div className="popup-form-cont">
                                        <label className="form-label">Telefoonnummer *</label>
                                        <input
                                            type="tel"
                                            className="form-controls"
                                            name="phone_number"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.phone_number}
                                            maxLength={10}
                                        />
                                        {formik.errors.phone_number ? (
                                            <ErrorMessage>{formik.errors.phone_number}</ErrorMessage>
                                        ) : null}
                                    </div>
                                    <div className="popup-form-cont">
                                        <label className="form-label">E-mailadres</label>
                                        <input
                                            type="email"
                                            className="form-controls"
                                            name="email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />
                                        {formik.errors.email ? (
                                            <ErrorMessage>{formik.errors.email}</ErrorMessage>
                                        ) : null}
                                    </div>
                                    <div className="popup-form-cont time">
                                        <label className="form-label">Afspraak op *</label>
                                        <input
                                            type="date"
                                            className="form-controls"
                                            name="appointment_on"
                                            min={new Date().toISOString().slice(0, 10)}
                                            // min={new Date().toLocaleDateString('en-CA')}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.appointment_on}
                                        />
                                        {formik.errors.appointment_on ? (
                                            <ErrorMessage>{formik.errors.appointment_on}</ErrorMessage>
                                        ) : null}
                                    </div>
                                    <div className="popup-form-cont time">
                                        <label className="form-label">Om *</label>
                                        <input
                                            type="time"
                                            className="form-controls"
                                            name="time"
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                // Trigger blur to close the time picker
                                                e.target.blur();
                                            }}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.time}
                                        />
                                        {formik.errors.time ? (
                                            <ErrorMessage>{formik.errors.time}</ErrorMessage>
                                        ) : null}
                                    </div>


                                    <div className="popup-form-cont">
                                        <label className="form-label">Behandeling*</label>
                                        <input
                                            type="text"
                                            className="form-controls"
                                            name="treatment"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.treatment}
                                        />
                                        {formik.errors.treatment ? (
                                            <ErrorMessage>{formik.errors.treatment}</ErrorMessage>
                                        ) : null}
                                    </div>

                                    <div className="popup-form-cont">
                                        <button
                                            // onClick={pageReload}
                                            type="submit"
                                            className="let-op-btn"
                                        // data-bs-dismiss="modal"
                                        >
                                            {loading ? "planning uw afspraak...!" : "Afspraak inplannen"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewAppointment;
