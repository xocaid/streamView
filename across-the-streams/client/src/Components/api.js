import axios from 'axios';
import qs from 'qs';
import { createContext } from 'react';
const CLIENT_ID = process.env.REACT_APP_TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_TWITCH_CLIENT_SECRET;

// let accessToken;
//b/c its going to be used multiple files, export needs go in front in order to be avialable to be imported by other files
export const APIContext = createContext(null);

export const getAccessToken = async () => {
    try {
        const res = await axios.post(
            //Twitch TV Developers: Client Credentials Grant Flow
            //To get access token, need to send HTTP POST request to site below:
            'https://id.twitch.tv/oauth2/token',
            qs.stringify({
                //per documentation: Registered Client ID & Secret are set
                //Per documentation: grant_type is set to string and MUST be set to client_credentials
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'client_credentials',

            })
        );
        // accessToken = res.data; will return to play with it elsewhere, don't use accesstoken because it will be stored in useContext
        return res.data;
    } catch (error) {
        //Note: error is an object, generic, and it won't always get you the info on what's wrong
        console.log(error);
        //Note: error.message is standard practice, that will return the error message, error description that should explain what error happened
        console.log(error.message);
        return null;
    }
};