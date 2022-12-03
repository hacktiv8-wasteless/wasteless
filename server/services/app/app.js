const express = require("express");
const app = express();
const { mongoConnect } = require("./config/mongo");
const router = require("./routes");
const PORT = process.env.PORT || 4001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

mongoConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("this app is running on port", PORT);
    });
  })
  .catch(console.error);
