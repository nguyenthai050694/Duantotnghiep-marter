import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment'
import '../css/detailsUser.css';
const UserDetails = (props) => {
    const timelineClick = () => {
        document.querySelector(".about-content").style.display = "none"
        document.querySelector(".timeline").style.display = "block"
    }
    const aboutClick = () => {
        document.querySelector(".about-content").style.display = "block"
        document.querySelector(".timeline").style.display = "none"
    }
    const navigate = useNavigate()
    const { isDetailsModal, toggleModal, updateData, handleUpdateImages, handleImages, urlImg, setImageUrls } = props;
    const [user, setUser] = useState(props.user);
    const [imageURL, setImageURL] = useState();
    const [imageUpload, setImageUpload] = useState();

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    const styleToast = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }

    const notifySuccess = (text) => {
        toast.success(text, styleToast)
    };
    const notifyWarning = (text) => {
        toast.warning(text, styleToast);
    };
    const notifyError = (text) => {
        toast.error(text, styleToast);
    };

    const toggle = () => {
        toggleModal()
        setUser({})
    }
    return (
        <div>
            <ToastContainer />
            <Modal isOpen={isDetailsModal} toggle={() => toggle()} size='xl' centered>
                <ModalHeader toggle={() => toggle()}>Details User</ModalHeader>
                <ModalBody>
                    <div class=" emp-profile">
                        <form method="post">
                            <div class="row">
                                <div class="col-md-5">
                                    <div>
                                        {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" /> */} 
                                            <img class="profile-img" src={urlImg} />                                     
                                    </div>
                                </div>
                                <div class="col-md-7">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="profile-head">
                                                <h3 >
                                                    {user.fullName}
                                                </h3>
                                                {/* <p class="proile-rating">{user.id}</p> */}
                                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" href="#home" role="tab" aria-controls="home" aria-selected="true" onClick={() => aboutClick()}>About</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" href="#profile" role="tab" aria-controls="profile" aria-selected="false" onClick={() => timelineClick()}>Timeline</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="tab-content profile-tab" id="myTabContent">
                                                <div class="tab-pane fade show active about-content" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Email</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Phone</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            {user.telephone}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Address</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            {user.address}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane fade show timeline" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                    {/* <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Role</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>{user.roleId}</p>
                                                        </div>
                                                    </div> */}
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label>created</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>{moment(user.created).format('DD/MM/YYYY HH:mm:ss')} - {user.creator}</p>
                                                        </div>
                                                    </div>
                                                    {/* <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Creator</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>Trần Văn A</p>
                                                        </div>
                                                    </div> */}
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Modified</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>{moment(user.modified).format('DD/MM/YYYY HH:mm:ss')} - {user.modifier}</p>
                                                        </div>
                                                    </div>
                                                    {/* <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Modifier</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>Trần Văn A</p>
                                                        </div>
                                                    </div> */}
                                                    {/* <div class="row">
                                                        <div class="col-md-6">
                                                            <label>Availability</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <p>6 months</p>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <label>Your Bio</label><br />
                                                            <p>Your detail description</p>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export default UserDetails;