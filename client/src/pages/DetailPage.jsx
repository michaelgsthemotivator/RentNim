import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchAnimeDetail, generatePaymentToken } from "../features/animeSlice";
import { useSelector, useDispatch } from "react-redux";

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAnimeDetail(id));
  }, []);

  const animeData = useSelector((state) => {
    // console.log(state.anime.detail, "ini state");
    return state.anime.detail;
  });
  //   console.log(animeData, "ini animedata detail");
  const {
    mal_id,
    title,
    images,
    trailer,
    titles,
    type,
    source,
    episodes,
    status,
    aired,
    duration,
    rating,
    score,
    synopsis,
    producers,
    licensors,
    studios,
    genres,
    themes,
    demographics,
  } = animeData;

  return (
    <>
      {/* <h1>ini detail page {id}</h1>
      {JSON.stringify(animeData)} */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6z)), url(${images?.jpg?.image_url})`,

          // backgroundSize: "cover",
        }}
      >
        <div
          style={{
            width: "50vw",
            border: "2px ",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
            <h1>{title}</h1>
          </div>
          <div>
            <img src={images?.jpg?.image_url} alt={title} />
          </div>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
            <div>
              <h2>Details:</h2>
              <p>Type: {type}</p>
              <p>Source: {source}</p>
              <p>Episodes: {episodes}</p>
              <p>Status: {status}</p>
              <p>
                Aired: from {aired?.from} to {aired?.to}
              </p>
              <p>Duration: {duration}</p>
              <p>Rating: {rating}</p>
              <p>Score: {score}</p>
            </div>
            <div>
              <h2>Synopsis:</h2>
              <p>{synopsis}</p>
            </div>
          </div>
        </div>
        <div style={{ gap: "10px", display: "flex", flexDirection: "row" }}>
          <div>
            <button
              onClick={() => {
                dispatch(
                  generatePaymentToken(
                    7,
                    mal_id,
                    images?.jpg?.image_url,
                    title,
                    navigate
                  )
                );
              }}
              className="btn btn-success"
            >
              7 Days
            </button>
          </div>
          <div>
            <button
              className="btn btn-success"
              onClick={() => {
                dispatch(
                  generatePaymentToken(
                    30,
                    mal_id,
                    images?.jpg?.image_url,
                    title,
                    navigate
                  )
                );
              }}
            >
              30 Days
            </button>
          </div>
          <div>
            <button
              className="btn btn-success"
              onClick={() => {
                dispatch(
                  generatePaymentToken(
                    90,
                    mal_id,
                    images?.jpg?.image_url,
                    title,
                    navigate
                  )
                );
              }}
            >
              90 Days
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
