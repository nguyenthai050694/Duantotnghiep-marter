import { React, useState } from "react";
import axios from "axios";
import { Await, useNavigate } from "react-router-dom";
import { Input } from "reactstrap";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import "../css/login.css";
import { Button } from "reactstrap";
const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleOnchangeInput = (e, id) => {
    let copyUser = { ...user };
    copyUser[id] = e.target.value;
    setUser({ ...copyUser });
  };
  const navigate = useNavigate();

  const handleButton = async () => {
    try {
      const res = await axios.post("http://localhost:8080/auth/login", null,

        { params: { userEmail: user.userEmail, password: user.password } });
      localStorage.setItem("token", res.data);
      console.log(localStorage.getItem(res.data));
      // console.log(localStorage.getItem('token'));
      // console.log(await axios.post("http://localhost:8080/auth/getLoginUser", localStorage.getItem('token')));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <MDBContainer fluid style={{ height: "40rem" }}>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <MDBCardBody className="p-5 w-500 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Sign in</h2>

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  placeholder="Email"
                  id="email"
                  onChange={(e) => handleOnchangeInput(e, "userEmail")}
                  value={user.userEmail}
                  type="text"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => handleOnchangeInput(e, "password")}
                  value={user.password}
                  type="password"
                  size="lg"
                />

                <hr className="my-2" />
                <NavLink className="navbar-brand ps-2" to="/register">
                  register
                </NavLink>
                <hr className="my-2" />

                <Button color="primary" onClick={() => handleButton()}>
                  Sign in
                </Button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Login;
