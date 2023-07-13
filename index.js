import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { connectDB } from './config/index.js'
import pollingRouter from './routes/routes.js'


const app = express()

app.set('views', path.join(path.resolve(), 'views'))
app.set('view engine', 'ejs')

connectDB()


app.use('/api', pollingRouter)
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})


const PORT = process.env.PORT || 4002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})