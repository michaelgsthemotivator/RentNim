import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function NavBar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
    Swal.fire({
      title: "Success Logout",
      icon: "Success",
    });
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Nim-Rent
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-rent">
                  My Rent
                </Link>
              </li>
              <button onClick={handleLogout} className="nav-link">
                Logout
              </button>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
