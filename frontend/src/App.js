import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Baserouter from './routes';
import CustomLayout from './layout/CustomLayout';
import './App.css';

function App() {
  return (
    <Router>
      <CustomLayout>
          <Baserouter />
      </CustomLayout>
    </Router>
  );
}

export default App;
