import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getStatusColor = (status) => {
  switch (status) {
    case 'overdue': return 'bg-red-500 text-white';
    case 'almost due': return 'bg-amber-500 text-white';
    case 'on-track': return 'bg-emerald-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const getStatusText = (status) => {
  return status.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');
};

const Home = () => {
  const { friends, isLoading } = useContext(AppContext);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="animate-spin text-keenDark w-12 h-12 mb-4" />
        <p className="text-gray-500 font-medium">Loading your connections...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
 
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900">Friends to keep close in your life</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-keenDark text-white rounded-md font-medium hover:bg-[#204438] transition-colors">
          <Plus size={18} /> Add a Friend
        </button>
      </div>

   
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Friends', value: friends.length },
          { label: 'On Track', value: friends.filter(f => f.status === 'on-track').length },
          { label: 'Need Attention', value: friends.filter(f => f.status === 'overdue' || f.status === 'almost due').length },
          { label: 'Interactions This Month', value: 12 }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {friends.map((friend) => (
            <div 
              key={friend.id} 
              onClick={() => navigate(`/friend/${friend.id}`)}
              className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md cursor-pointer transition-shadow"
            >
              <img src={friend.picture} alt={friend.name} className="w-20 h-20 rounded-full mb-4 object-cover" />
              <h3 className="font-bold text-gray-900">{friend.name}</h3>
              <p className="text-xs text-gray-400 mb-3">{friend.days_since_contact}d ago</p>
              
              <div className="flex flex-wrap justify-center gap-1 mb-4">
                {friend.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-100 text-[10px] text-gray-600 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wide ${getStatusColor(friend.status)}`}>
                {getStatusText(friend.status)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;