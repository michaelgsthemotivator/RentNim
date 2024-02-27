import { Link, useNavigate } from "react-router-dom";
import RightImage from "../public/naruto_anime_wallpaper_by_aianimelab_dg6soxp-414w-2x.jpg";
import { useState } from "react";
import axios from "../config/instance";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  //   console.log(loginInput);

  const navigate = useNavigate();

  async function HandleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        url: "/login",
        method: "post",
        data: {
          email: loginInput.email,
          password: loginInput.password,
        },
      });
      //   console.log(data);
      localStorage.access_token = data.access_token;
      // console.log(data.access_token);

      Swal.fire({
        title: "Success!",
        text: "Sukses Login!",
        icon: "success",
      });

      navigate("/");
    } catch (error) {
      console.log(error.response.data.message, "error saat mau login");
      Swal.fire({
        title: "Error !!",
        text: error.response.data.message,
        icon: "error",
      });
    }
  }

  async function googleLogin(res) {
    try {
      console.log(res, "aku res");
      const resLogin = await axios({
        url: "/google_login",
        method: "post",
        headers: { google_token: res.credential },
      });
      // console.log(google_token, "google token");
      localStorage.access_token = resLogin.data.access_token;
      // console.log(localStorage.access_token, "ini access token");
      Swal.fire({
        title: "Success!",
        text: "Sukses Login Pake Google Sign!",
        icon: "success",
      });
      navigate("/");
    } catch (err) {
      console.log(err.response.data.message);
      Swal.fire({
        title: "error!",
        text: err.response.data.message,
        icon: "error",
      });
    }
  }

  return (
    <>
      <div style={{ display: "flex", width: "100vw", alignItems: "center" }}>
        <div
          style={{
            width: "50vw",
            padding: "50px",
            // border: "70px",
          }}
        >
          <h1>Login</h1>
          <form onSubmit={HandleLogin}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) =>
                  setLoginInput({ ...loginInput, email: e.target.value })
                }
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
                onChange={(e) =>
                  setLoginInput({ ...loginInput, password: e.target.value })
                }
              />
            </div>
            <div
              className="mb-3 form-check"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label>
                Dont Have An Account ? <Link to="/register">Register</Link>
                <div>----OR----</div>
              </label>
            </div>
            <div className="mb-3 form_control">
              <GoogleLogin
                onSuccess={(res) => {
                  googleLogin(res);
                }}
                onError={(res) => {
                  googleLogin(res);
                }}
              />
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
              border: "40px",
              borderRadius: "30px",
            }}
          />
        </div>
      </div>
    </>
  );
}
