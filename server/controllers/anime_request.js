const axios = require("axios");

const getAnimes = async (req, res, next) => {
  try {
    let page = req.query.page;
    if (!page) {
      page = 1;
    }
    const axiosAnimesToGet = await axios({
      method: "get",
      url: `https://api.jikan.moe/v4/anime/?page=${page}`,
    });
    const animeData = axiosAnimesToGet.data.data.map((el) => {
      return {
        mal_id: el.mal_id,
        title: el.title,
        imageUrl: el.images.jpg.image_url,
        synopsis: el.synopsis,
        year: el.year,
        score: el.score,
        popularity: el.popularity,
      };
    });
    res.status(200).json(animeData);
  } catch (error) {
    next(error);
  }
};

const animeDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const animeDetail = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);

    res.status(200).json(animeDetail.data.data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  animeDetail,
  getAnimes,
};
