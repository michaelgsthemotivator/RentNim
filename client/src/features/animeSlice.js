import { createSlice } from "@reduxjs/toolkit";
import axios from "../config/instance";
import Swal from "sweetalert2";

const initialState = {
  anime: [],
  detail: [],
  rent: [],
};

export const animeSlice = createSlice({
  //create slice,, bikin tempat penampung state
  name: "anime",
  initialState,
  reducers: {
    setAnime: (state, action) => {
      // console.log(action.payload, "action payload");
      state.anime = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
    setRent: (state, action) => {
      state.rent = action.payload;
    },
  },
});

export const { setAnime, setDetail, setRent } = animeSlice.actions;

export const fetchAnimes = (currentPage) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "get",
      url: `/animes/?page=${currentPage}`,
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    // console.log(data, "data dari fetch anime");
    dispatch(setAnime(data));
    // console.log(anime);
  } catch (error) {
    console.log(error, "fetch fail");
  }
};

export const fetchAnimeDetail = (id) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "get",
      url: `/animes/detail/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    console.log(data, "fetch anime detail");
    dispatch(setDetail(data));
    // console.log(anime);
  } catch (error) {
    console.log(error, "fetch fail");
  }
};

// rent
export const fetchMyRent = () => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "get",
      url: `/rent`,
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    console.log(data, "fetch my rent");
    dispatch(setRent(data));
    // console.log(anime);
  } catch (error) {
    console.log(error, "fetch fail");
  }
};

// payment
export const generatePaymentToken =
  (duration, animeId, imageUrl, title, navigate) => async (dispatch) => {
    try {
      // console.log("masuk");
      const token = await axios({
        method: "post",
        url: `/payment/generate`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        data: { duration, animeId, imageUrl, title },
      });
      console.log(token.data.transactionToken, "aku token");
      // console.log(window, "hlawhf");
      await window.snap.pay(token.data.transactionToken.token, {
        onSuccess: async function (result) {
          /* You may add your own implementation here */
          const patch = await axios({
            url: "/payment/success",
            method: "patch",
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
            data: result,
          });
          Swal.fire({
            title: "Payment Verified",
            icon: "success",
          });
          navigate("/my-rent");
          console.log(result, "aku result");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */

          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
        },
      });
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
      console.log(error, "generate token failed");
    }
  };

export default animeSlice.reducer;
