const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")

const app = express()
const allowedOrigins = [ "http://localhost:5173", "http://127.0.0.1:5173" ]

app.use(express.json())
app.use(cookieParser())
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true)
            }

            return callback(new Error("Not allowed by CORS"))
        },
        credentials: true
    }))
}

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

if (process.env.NODE_ENV === "production") {
    const frontendDistPath = path.resolve(__dirname, "../../Frontend/dist")

    app.use(express.static(frontendDistPath))

    app.get("*splat", (req, res, next) => {
        if (req.path.startsWith("/api")) {
            return next()
        }

        return res.sendFile(path.join(frontendDistPath, "index.html"))
    })
}


module.exports = app
