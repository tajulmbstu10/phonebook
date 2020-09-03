import express from 'express';
import path from 'path';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import contactRoute from './routes/contactRoutes';


const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err)
  console.log(config.MONGODB_URL);
});
db.once('open', () => {
  // we're connected!
  console.log("Database Connection Successful")
});

const app = express();
const port = config.PORT;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/contacts", contactRoute);
app.use(express.static(path.join(__dirname, 'public')));


if (config.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, '/../frontend/build')));
  app.use(express.static(path.join(__dirname, '/public')));
  // 
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  });
} else {
  app.get('/', (req, res) => {
    res.send("Welcome to phonebook app");
  });
  app.get('/api', (req, res) => {
    res.send("Welcome to the api of phonebook app");
  });
}



app.listen(port, () => console.log(`App listening at http://localhost:${port}`));