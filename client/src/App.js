import './App.css';
import { useEffect, useState } from 'react';
import { APIContext, getAccessToken } from './Components/api';
import Header from './Margins/header';
import Footer from './Margins/footer';
import MainPg from './Components/mainPg';

function App() {
  //useContext Hook works in multiple layers of components. It is configured in the main file (App.js - highest level),so we are able to reuse in any other components, to avoid props drilling, which can get messy.
  //useState to store the accessToken
  const [accessToken, setAccessToken] = useState(null);

  //useEffect Hook tells React that your component needs to do something after render.
  //
  useEffect(() => {
    console.log('Print accessToken from App.js', JSON.stringify(accessToken))
    //ANONYMOUS FX: Use it once & done
    //useEffect(() => {}, []);

    //NAMED FX: Used multiple times throughout code
    //const namedFunction = () => {};
    //useEffect(namedFunction, []);

    //Should only run once because of dependency array....runs once because of the dependecy array being empty
    //How getAccessToken is being saved into the useState, it will update all it's children
    //It is being updated via built in methods such as useState, useState will receive update and then gives the updates to its children, updating the values.
    getAccessToken()
      .then(keyToken => setAccessToken(keyToken))
      .catch(console.error)
  },
    []);

  if (!accessToken) {
    return <div>
      Loading...
    </div>;
  } else {
    return (
      //APIContext.Provider value prop from useState variable; value you want to pass to all the components reading this context inside this provider.
      //APIContext.Provider specifies the conttext value 
      //Provider needs to wrap around all components that will use the accessToken, so all can access the necessary info.
      // {{ }} FUTURE PROOF: Storing more than 1 piece of info; 1st {} goes into the JS layer; 2nd {} goes into JS Object.
      //Context is being wrapped by .Provider, BUT NOT using useContext, so there is no need to import  useContext from react.
      <APIContext.Provider value={{ accessToken }}>
        <div className="App">
          <Header />
          <MainPg />
          <Footer />
        </div>
      </APIContext.Provider>
    );
  }
}
export default App;

/*
NOTES:
useContext - sets global state to your component; Info is passed top down only
Provider - Passes the value, provides you the value
Comnsumer - use with class components

APP.JS
Not exectuted until it's used(referenced)
App.js is the CORE component and the entry point for React
App.js runs first, since React is read top down, when it gets to Line 3 it accessses api.js to get the info and the createContext.
componentDivMount lifecyle completes, then we can use useEffect()
Once everything is mounted, before App.js can be considered mounted THEN useEffect() is triggered. 
Only then can you run async operations which will return a promise(.then & .catch)

API.JS
getAccessToken is called after the 1st render, any async function needs to run after mounted
Render(s) and component(s) run synchronously. 

*/
