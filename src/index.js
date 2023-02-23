import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app.js'

dotenv.config()

const port = process.env.PORT
const MONGODB_URL = process.env.MONGO_URL

mongoose.set('strictQuery', false)

mongoose.connect(MONGODB_URL, (error) => {
  if(error) {
    console.log('Database error: ', error)
  } else {
    console.log('Database connected')
    app.listen(port, () => {
      console.log('App listening')
    })
  }
})