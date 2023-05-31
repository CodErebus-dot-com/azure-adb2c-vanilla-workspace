import React from 'react';
import { Helmet } from 'react-helmet-async';
import './styles/index.css';
import appConfig from '../config/client';
import Home from './pages/Home';

const App = () => {

  return (
    <React.Fragment>
      <Helmet {...appConfig.seo} />
      <Home />
    </React.Fragment>
  );
};

export default App;
