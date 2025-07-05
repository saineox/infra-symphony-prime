
import React from 'react';

const ProfilePicture = () => {
  return (
    <div className="relative w-48 h-48 mx-auto mb-8">
      <div className="w-full h-full rounded-full overflow-hidden border-4 border-gradient-to-r from-green-400 via-blue-400 to-purple-400 shadow-2xl">
        <img 
          src="/lovable-uploads/4e18bbe6-9029-4a52-b8bf-99c5281549ba.png" 
          alt="Pradeep Kadam - DevOps Engineer" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400/20 via-blue-400/20 to-purple-400/20 animate-pulse"></div>
    </div>
  );
};

export default ProfilePicture;
