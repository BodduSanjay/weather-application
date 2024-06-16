import React, { useState } from 'react';
import themeContext from './context/themeContext';
import Header from './components/Header';
import Home from './components/Home';

const App = () => {
  const [isLight, setIsLight] = useState(true);

  const changeTheme = () => {
    setIsLight(prevVal => !prevVal);
  };

  return (
    <themeContext.Provider value={{ isLight, changeTheme }}>
      <Header />
      <Home />
    </themeContext.Provider>
  );
};

export default App;
