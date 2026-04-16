import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import FriendDetail from './pages/FriendDetails.jsx';
import Timeline from './pages/Timeline.jsx'
import Stats from './pages/Stats.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="friend/:id" element={<FriendDetail />} />
            <Route path="Timeline" element={<Timeline />} />
            <Route path="stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;