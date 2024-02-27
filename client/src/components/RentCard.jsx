import Swal from "sweetalert2";
import axios from "../config/instance";
import { fetchMyRent } from "../features/animeSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
useDispatch;
export default function RentCard({ data }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyRent());
  }, []);

  async function handleDelete() {
    try {
      await axios({
        method: "delete",
        url: `/rent/${data.id}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Swal.fire({
        title: "Success Delete Rent",
        icon: "success",
      });
      dispatch(fetchMyRent());
    } catch (error) {
      console.log(error, "error delete rent");
    }
  }
  return (
    <>
      {/* {JSON.stringify(data)} */}
      <div className="col-2">
        <div className="card">
          <div className="card-img-top">
            <img src={data.imageUrl} alt={data.animeTitle} />
          </div>
          <div className="card-body">
            <h5 className="card-title">{data.animeTitle}</h5>
            <p className="card-text">
              Paid :
              {data.paid === true ? (
                <div style={{ color: "green" }}>
                  {JSON.stringify(data.paid).toUpperCase()}
                </div>
              ) : (
                <div style={{ color: "red" }}>
                  {JSON.stringify(data.paid).toUpperCase()}
                </div>
              )}
            </p>
            <p className="card-text">
              Expired :
              {data.expired === true ? (
                <div style={{ color: "red" }}>
                  {JSON.stringify(data.expired).toUpperCase()}
                </div>
              ) : (
                <div style={{ color: "green" }}>
                  {JSON.stringify(data.expired).toUpperCase()}
                </div>
              )}
            </p>
            {data.expired === true ? null : (
              <p
                className="card-text"
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                {data.timeRemaining / 86400} Days Left
              </p>
            )}
            <p className="card-text"></p>
            <button
              className="btn btn-success"
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
