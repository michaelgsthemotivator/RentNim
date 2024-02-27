import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import RentCard from "../components/RentCard";

import { fetchMyRent } from "../features/animeSlice";
export default function MyRentPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyRent());
  }, []);

  const rents = useSelector((state) => {
    console.log(state.anime.rent, "ini state rent page");
    return state.anime.rent;
  });
  console.log(rents, "ini rentalan");
  return (
    <>
      <h1>My Rented Anime</h1>
      <div
        style={{
          display: "flex",

          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center",
        }}
      >
        {rents.map((data) => (
          <RentCard key={data.animeId} data={data} />
        ))}
      </div>
    </>
  );
}
