import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import ErrorMessage from '../loginpagecontainer/ErrorMessage';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsersAppointment, updateUsersAppointment } from '../services/Auth';
import { validateUpdateAppointment } from '../validators/ValidationAppointment';
import { urlPrefix } from '../helpers/Common';
import { toast } from 'react-toastify';


const UpdateAppointment = ({ userid }) => {
    // const pageReload = () => {
    //     window.location.reload();
    //   }
    const { id } = useParams();
    const userId = userid || id;
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            phone_number: '',
            email: '',
        },
        validate: validateUpdateAppointment,
        onSubmit: async (values) => {
           // alert("Okkkkkkkkkkkkkk")
            setIsLoading(true);
            try {
              //  alert("okkkk")
                const response = await updateUsersAppointment(values.id, values);
                //  alert("Okkkkkkkkkkkkkk")
                // alert(JSON.stringify(updatedData))
                if (response) {
                    toast.success("Appointment updated",
                    );
                    window.location.reload();
                }
            } catch (error) {
                // Display error toast if update fails
                toast.error(`Update error: ${error.message || "Unknown error"}`);
            } finally {
                setIsLoading(false);
            }
        },
    });

    useEffect(() => {
       
        const fetchUserData = async () => {
            setIsLoading(true);
            try {            
                const userData = await getUsersAppointment(userid); // If userId exists, it will fetch specific user data
                //  console.log("Fetched userData:", userData);
                // alert(JSON.stringify(userData.data[0].id))
                if (userData?.success) {
                    const data = userData.data[0];
                    formik.setValues({
                        id: data.id,
                        name: data.name,
                        phone_number: data.phone_number,
                        email: data.email,
                    });
                } else {
                    // alert("No user data found for ID:", userid);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                toast.error('Failed to fetch user data');
            } finally {
                setIsLoading(false);
            }
        };

        if (userid) {
            fetchUserData();
        }
    }, [userid]);


    return (
        <div class="modal fade afpraak klanten" id="exampleModal-1"
            tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 id="exampleModalLabel">Gegevens aanpassen</h4>
                        <button type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close" ></button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div class="popup-form">
                                <div class="popup-form-cont">
                                    <label className="form-label">Klantnaam *</label>
                                    <input type="text"
                                        id='name'
                                        name='name'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        placeholder="name"
                                        class="form-controls"
                                    />
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}></div>
                                    {formik.errors.name ? (
                                        <ErrorMessage>{formik.errors.name}</ErrorMessage>
                                    ) : null}
                                </div>
                                <div class="popup-form-cont">
                                    <label className="form-label">Telefoonnummer *</label>
                                    <input type="tel"
                                        name='phone_number'
                                        value={formik.values.phone_number}
                                        onChange={formik.handleChange}
                                        placeholder="phone_number"
                                        class="form-controls" 
                                        maxLength={10}/>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}></div>
                                    {formik.errors.phone_number ? (
                                        <ErrorMessage>{formik.errors.phone_number}</ErrorMessage>
                                    ) : null}
                                </div>
                                <div class="popup-form-cont">
                                    <label className="form-label">E-mailadres</label>
                                    <input type="email"
                                        name='email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        placeholder="email"
                                        class="form-controls" />
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}></div>
                                    {formik.errors.email ? (
                                        <ErrorMessage>{formik.errors.email}</ErrorMessage>
                                    ) : null}
                                </div>
                                <div class="popup-form-cont">
                                    <button
                                        // onClick={pageReload} 
                                        type="submit" class="let-op-btn"
                                    // data-bs-dismiss="modal" aria-label="Close"
                                    >Afspraak inplannen</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateAppointment;