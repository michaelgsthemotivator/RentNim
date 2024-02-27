import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import AnimeCard from "../components/AnimeCard";
import { fetchAnimes } from "../features/animeSlice";
import Pagination from "../components/Pagination";

export default function HomePage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAnimes(currentPage));
  }, [currentPage]);

  const animes = useSelector((state) => {
    // ini ngambil state dari animeSlice dan ditampung dalam variabel animes
    // console.log(state, "ini state");
    return state.anime.anime;
  });

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }
  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <>
      {/* {JSON.stringify(animes)} */}

      <div
        style={{
          display: "flex",

          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center",
        }}
      >
        {animes.map((data) => (
          <AnimeCard key={data.mal_id} data={data} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        previous={handlePreviousPage}
        next={handleNextPage}
      />
    </>
  );
}
