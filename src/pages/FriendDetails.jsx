import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {   Clock, Archive, Trash2, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import phone from '../assets/call.png'
import message from '../assets/text.png'
import video from '../assets/video.png'

const FriendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { friends, addTimelineEntry } = useContext(AppContext);
  
  const friend = friends.find(f => f.id === parseInt(id));

  if (!friend) return <div className="text-center py-20 text-gray-500">Friend not found.</div>;

  const handleInteraction = (type) => {
    addTimelineEntry(type, friend.name);
    toast.success(`Logged ${type} with ${friend.name}!`);
  };

  const getStatusColor = (status) => {
    if (status === 'overdue') return 'bg-red-500 text-white';
    if (status === 'almost due') return 'bg-amber-500 text-white';
    return 'bg-emerald-500 text-white';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
   
      <div className="space-y-4">
        <div className="bg-white border border-gray-100 rounded-xl p-8 flex flex-col items-center text-center shadow-sm">
          <img src={friend.picture} alt={friend.name} className="w-24 h-24 rounded-full mb-4 object-cover" />
          <h2 className="text-2xl font-bold text-gray-900">{friend.name}</h2>
          
          <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wide mt-2 mb-4 ${getStatusColor(friend.status)}`}>
            {friend.status.replace(' ', '-')}
          </span>

          <div className="flex flex-wrap justify-center gap-1 mb-6">
            {friend.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-[10px] text-gray-600 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-600 italic mb-4">"{friend.bio}"</p>
          <p className="text-xs text-gray-400">Preferred: {friend.email}</p>
        </div>

     
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col divide-y divide-gray-100">
          <button className="flex items-center justify-center gap-2 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Clock size={16} /> Snooze 2 Weeks
          </button>
          <button className="flex items-center justify-center gap-2 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Archive size={16} /> Archive
          </button>
          <button className="flex items-center justify-center gap-2 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium">
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>


      <div className="md:col-span-2 space-y-6">
       
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm">
            <p className="text-2xl font-bold text-gray-900">{friend.days_since_contact}</p>
            <p className="text-xs text-gray-500 mt-1">Days Since Contact</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm">
            <p className="text-2xl font-bold text-gray-900">{friend.goal}</p>
            <p className="text-xs text-gray-500 mt-1">Goal (Days)</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm">
            <p className="text-lg font-bold text-gray-900 mt-1">{new Date(friend.next_due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            <p className="text-xs text-gray-500 mt-2">Next Due</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Relationship Goal</h3>
            <p className="text-sm text-gray-600">Connect every <span className="font-bold text-gray-900">{friend.goal} days</span></p>
          </div>
          <button className="px-4 py-2 border border-gray-200 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
            <Edit2 size={12} /> Edit
          </button>
        </div>

       
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Check-In</h3>
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => handleInteraction('Call')}
              className="flex flex-col items-center justify-center gap-2 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100"
            >
             <img 
        src={phone}
        alt="Call icon" 
        className="w-8 h-8 object-contain" 
      />
              <span className="text-sm font-medium text-gray-700">Call</span>
            </button>
            <button 
              onClick={() => handleInteraction('Text')}
              className="flex flex-col items-center justify-center gap-2 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100"
            >
               <img 
        src={message}
        alt="message icon" 
        className="w-8 h-8 object-contain" 
      />
              <span className="text-sm font-medium text-gray-700">Text</span>
            </button>
            <button 
              onClick={() => handleInteraction('Video')}
              className="flex flex-col items-center justify-center gap-2 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100"
            >
               <img 
        src={video}
        alt="video icon" 
        className="w-8 h-8 object-contain" 
      />
              <span className="text-sm font-medium text-gray-700">Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetail;