import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
config();

const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//
const CLIENT_ID = process.env.REACT_APP_TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_TWITCH_CLIENT_SECRET;


app.get('/', (req, res) => {
    const url = 'https://api.twitch.tv/helix/search/channels';
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        res.send(data);
    });
})

app.listen(PORT, () => console.log(`Server is running locally on PORT: ${PORT}.`));