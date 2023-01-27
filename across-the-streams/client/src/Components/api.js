import axios from 'axios';
import qs from 'qs';
import { createContext } from 'react';
const CLIENT_ID = process.env.REACT_APP_TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_TWITCH_CLIENT_SECRET;

//Do not need accessToken variable because using will be using useContext Hook
// let accessToken;
//useContext Hook works in multiple layers of components. It is created in the main file (App.js - highest level),
// so we are able to reuse in any other components, to avoid props drilling, which can get messy.
//accessToken will be used multiple files, we need to EXPORT the APIContext variable, export is placed at the beginning od declared variable so it can be exported and used in other files.
//createContext: Call it only ONCE & at a central location
//useContext will be used everywhere else in the project
export const APIContext = createContext(null);

//const getAccessToken is a function, in order to be able to use, it needs to be exported!
export const getAccessToken = async () => {
    try {
        const res = await axios.post(
            //Twitch TV Developers: Client Credentials Grant Flow
            //To get access token, need to send HTTP POST request to site below:
            'https://id.twitch.tv/oauth2/token',
            qs.stringify({
                //per API Documentation: Registered Client ID & Secret are set
                //Per API Documentation: grant_type is set to string and MUST be set to client_credentials
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'client_credentials',

            })
        );
        //Do not need accessToken because it will be using useContext Hook. 
        //UseContext Hook will help 
        // accessToken = res.data;
        return res.data;
    } catch (error) {
        //Note: error is an object, generic, and it won't always get you the info on what's wrong
        console.log(error);
        //Note: error.message is standard practice, that will return the error message, error description that should explain what error happened
        console.log(error.message);
        //?????????????ASK QUESTIONS*******************************

        //Specify to return null, otherwise it will return undefined by default. State value is set to null, so it's better to stay consistent.
        return null;
    }
};