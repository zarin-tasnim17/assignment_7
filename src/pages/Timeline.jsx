import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Phone, MessageSquare, Video, Users } from 'lucide-react';
import phone from '../assets/call.png'
import message from '../assets/text.png'
import video from '../assets/video.png'


const getIcon = (type) => {
  switch (type) {
    case 'Call': return <img src={phone}/>;
    case 'Text': return < img src={message}/>;
    case 'Video': return <img src={video}/>;
    case 'Meetup': return <Users size={18} className="text-amber-500" />;
    default: return <MessageSquare size={18} className="text-gray-500" />;
  }
};

const Timeline = () => {
  const { timeline } = useContext(AppContext);
  const [filter, setFilter] = useState('All');
 

  const filteredTimeline = filter === 'All' 
    ? timeline 
    : timeline.filter(entry => entry.type === filter);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Timeline</h1>
        
        <select 
          className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-keenDark"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">Filter timeline</option>
          <option value="Call">Calls</option>
          <option value="Text">Texts</option>
          <option value="Video">Videos</option>
      
        </select>
      </div>

      <div className="space-y-4">
        {filteredTimeline.length === 0 ? (
          <p className="text-center text-gray-500 py-10 bg-white rounded-lg border border-gray-100">No interactions found.</p>
        ) : (
          filteredTimeline.map((entry) => (
            <div key={entry.id} className="bg-white border border-gray-100 rounded-lg p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-gray-50 rounded-full border border-gray-100 shrink-0">
                {getIcon(entry.type)}
              </div>
              <div className="pt-1">
                <h3 className="font-semibold text-gray-900">{entry.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{entry.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Timeline;