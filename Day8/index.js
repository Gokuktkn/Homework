import express from "express";
import userRoute from "./routes/users.route.js";
import databaseService from "./services/database.services.js";

const app = express();
const PORT = 1007;

app.use(express.json());

databaseService.connect();
app.use("/users", userRoute);

app.use((err, req, res, next) => {
    if (err.message) {
      return res.json({ error: err.message });
    } else {
      return res.json({ err });
    }
  });
  
  app.listen(PORT, (err) => {
    console.log(`Your app is listening on ${PORT}`);
  });