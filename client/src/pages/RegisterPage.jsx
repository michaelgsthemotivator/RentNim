import { Link, useNavigate } from "react-router-dom";
import RightImage from "../public/Euphilia.Magenta.full.3881444.jpg";
import axios from "../config/instance";
import { useState } from "react";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [registerInput, setRegisterInput] = useState({
    email: "",
    password: "",
  });

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const { datas } = await axios({
        url: "/register",
        method: "post",
        data: registerInput,
      });
      console.log(datas);

      navigate("/login");
      Swal.fire({
        title: "Success!",
        text: "Success register!",
        icon: "success",
      });
    } catch (error) {
      console.log(error.response.data.message, "error ketika mau register");
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
      });
    }
  }
  //   console.log(registerInput);
  return (
    <>
      <div style={{ display: "flex", width: "100vw", alignItems: "center" }}>
        <div
          style={{
            width: "50vw",
            padding: "50px",
            border: "70px",
          }}
        >
          <h1>Create Your Account</h1>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => {
                  setRegisterInput({
                    ...registerInput,
                    email: e.target.value,
                  });
                }}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => {
                  setRegisterInput({
                    ...registerInput,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-3 form-check">
              <label>
                Already Have An Account ? <Link to="/login">Login</Link>
              </label>
            </div>
            <div style={{}}>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div>
          <img
            src={RightImage}
            style={{
              width: "50vw",
              padding: "50px",
              border: "70px",
            }}
          />
        </div>
      </div>

      <style>
        {`
  
    `}
      </style>
    </>
  );
}
