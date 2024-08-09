import express from "express";
import * as dotenv from "dotenv";
import criminososRoutes from "./routes/criminosos.routes";
import armasRoutes from "./routes/armas.routes";
import crimesRoutes from "./routes/crimes.routes";

dotenv.config();

const app = express();
app.use(express.json());

//ROUTES
app.use("/criminosos", criminososRoutes());
app.use("/armas", armasRoutes());
app.use("/crimes", crimesRoutes());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}...`);
});
