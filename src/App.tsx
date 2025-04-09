import React from 'react';
import Navbar from './components/navbar/Navbar';
import { HistogramProvider } from './context/useHistogram';
import './App.css'

function App() {
  return (
    <div className="App">
       <HistogramProvider>
      <Navbar />
       </HistogramProvider>
    </div>
  );
}

export default App;
