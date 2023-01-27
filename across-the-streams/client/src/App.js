import './App.css';
import { useEffect, useState } from 'react';
import { APIContext, getAccessToken } from './Components/api';
import Header from './Margins/header';
import Footer from './Margins/footer';
import MainPg from './Components/mainPg';

function App() {
  //useState to store the accessToken
  const [accessToken, setAccessToken] = useState(null);

  //useEffect Hook tells React that your component needs to do something after render.
  //
  useEffect(() => {
    //ANONYMOUS FX: Use it once & done
    //useEffect(() => {}, []);

    //NAMED FX: Used multiple times throughout code
    //const namedFunction = () => {};
    //useEffect(namedFunction, []);
    
    //Should only run once because of dependency array
    //Look up: Component Div Mount
    getAccessToken()
      .then(keyToken => setAccessToken(keyToken))
      .catch(console.error)
  },
    []);

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

export default App;
