import { React, useState } from "react";
import axios from 'axios';
import moment from 'moment';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
  from 'mdb-react-ui-kit';
import { NavLink} from "react-router-dom";
import '../css/login.css';
import { Button } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const User_Rest_API_URL = 'http://localhost:8080/admin/user';
const Register = (props) => {
  const { updateData, uploadFile, imageUpload } = props;
  // const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];
  // const [updateData, setUpdateData] = useState(props);
  const [user, setUser] = useState({});
  const notifySuccess = (text) => {
    toast.success(text, styleToast)
  };
  const notifyWarning = (text) => {
    toast.warning(text, styleToast);
  };
  const notifyError = (text) => {
    toast.error(text, styleToast);
  };

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


  const handleOnchangeInput = (event, id) => {
    const copyUser = { ...user };
    if (id === 'image') {
      copyUser[id] = event.target.files[0].name;
    } else {
      copyUser[id] = event.target.value;
    }
    setUser({
      ...copyUser
    })
  }



  const createUser = () => {
    try {
      const create = async () => {
        let res = await axios.post(User_Rest_API_URL + '/post', {
          roleId: user.roleId,
          fullName: user.fullName,
          password: user.password,
          email: user.email,
          telephone: user.telephone,
          address: user.address,
          image: user.image,
          created: user.created,
          creator: user.creator,
          modified: user.modified,
          modifier: user.modifier,
          status: user.status
        })
        let data = (res && res.data) ? res.data : []
        data.created = moment(data.created).format('DD/MM/YYYY HH:mm:ss');
        if (data.modified > 0) {
          data.modified = moment(data.modified).format('DD/MM/YYYY HH:mm:ss');
        }
        updateData(data, `create`)
      }
      create()
      notifySuccess("Đăng ký thành công")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="login">
      <ToastContainer />
      <MDBContainer fluid>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>

            <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
              <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                <h2 className="fw-bold mb-2 text-center">Sign up</h2>

                <MDBInput wrapperClass='mb-4 w-100' placeholder="Fullname" id='formControlLg' type='fullname' size="lg"
                  value={user.fullName}
                  onChange={(event) => handleOnchangeInput(event, 'fullName')}
                />
                <MDBInput wrapperClass='mb-4 w-100' placeholder="Email" id='formControlLg' type='email' size="lg"
                  value={user.email}
                  onChange={(event) => handleOnchangeInput(event, 'email')}
                />
                <MDBInput wrapperClass='mb-4 w-100' placeholder="Password" id='formControlLg' type='password' size="lg"
                  value={user.password}
                  onChange={(event) => handleOnchangeInput(event, 'password')}
                />
                <MDBInput wrapperClass='mb-4 w-100' placeholder="Telephone" id='formControlLg' type='telephone' size="lg"
                  value={user.telephone}
                  onChange={(event) => handleOnchangeInput(event, 'telephone')}
                />
                <MDBInput wrapperClass='mb-4 w-100' placeholder="Address" id='formControlLg' type='address' size="lg"
                  value={user.address}
                  onChange={(event) => handleOnchangeInput(event, 'address')}
                />
                <hr className="my-2" />
                <NavLink className="navbar-brand ps-2" to="/login" >Đã có tài khoản?</NavLink>
                <hr className="my-2" />
                <Button color="primary" onClick={(e) => { createUser(e) }}>
                  Sign up
                </Button>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </div>
  );
}

export default Register;