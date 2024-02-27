import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
export default function AnimeCard({ data }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="col-2">
        <div className="card">
          <div className="card-img-top">
            <img src={data.imageUrl} alt={data.title} />
          </div>
          <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
            <p className="card-text">Score : {data.score}</p>
            <Link to={`/details/${data.mal_id}`}>
              <button className="btn btn-success">Detail</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
