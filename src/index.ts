import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import morgan from 'morgan';
import { createNewsletter } from './service/newsletter.service';
import { connection } from './configs/mongodb';
import { sub } from './configs/subscriber';

connection();


const app = express();
app.use(express.json())

app.use(morgan('dev'))

const port = process.env.PORT || 2600;




app.get('/', (_, res) => {
  return res.send(`<h1>Welcome to Subscriber 2 Sample`)
})






sub.subscribe('newsletter', ['66aaab03481e930eee56eb8e'], async (message: string) => {
  console.log('SUB 2')
  const msg = JSON.parse(message)
  await createNewsletter(msg.name, msg.email);
})


app.listen(port, () => console.log(`Server on http://localhost:${port}`))

