import React, { createContext, useState, useEffect } from 'react';
import friendsData from '../data/friends.json';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [timeline, setTimeline] = useState([
   
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  
    const timer = setTimeout(() => {
      setFriends(friendsData);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const addTimelineEntry = (type, friendName) => {
    const newEntry = {
      id: Date.now(),
      type,
      title: `${type} with ${friendName}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setTimeline([newEntry, ...timeline]);
  };

  return (
    <AppContext.Provider value={{ friends, timeline, addTimelineEntry, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};