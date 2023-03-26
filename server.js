const path = require("path")
const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const connectDB = require("./server/config/db.js")

const { errorHandler } = require("./server/middleware/errorMiddleware")

connectDB()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api/lughet", require("./server/routes/lughetRoutes"))
app.use("/api/editor", require("./server/routes/editorRoutes"))
app.use("/api/dialog", require("./server/routes/dialogRoutes"))
app.use(errorHandler)

// Serve static assets in production

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/build"));
  app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/build/index.html)`)
  });
}

const port = process.env.PORT || 5000


app.listen(port, () => {

  console.log(`Server is running on port: ${port}`);
});