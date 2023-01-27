import { useEffect, useState } from 'react';
import './App.css';
import { APIContext, getAccessToken } from './Components/api';
import Header from './Margins/header';
import Footer from './Margins/footer';
import MainPg from './Components/mainPg';

function App() {
  //state to store the accessToken
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    //  const keyToken = await getAccessToken();
    //  setAccessToken(keyToken);
    getAccessToken()
      .then(keyToken => setAccessToken(keyToken))
      .catch(console.error)
  },
    []);

  return (
    //state value
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
