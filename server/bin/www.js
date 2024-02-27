if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = require("../app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
