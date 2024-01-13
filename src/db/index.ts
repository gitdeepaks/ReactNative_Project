import mongoose from "mongoose";

mongoose
  .connect("mongodb://root:root@localhost:27017")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
