import React from 'react';
import { useSelector } from 'react-redux';

function UserProfile() {
  const userInfoReducer = useSelector((state) => state.userInfoReducer);
  const { userName, userPhoto, userLevel, userexp } = userInfoReducer.userInfo;
  return (
    <div className="user_profile">
      <div className="user_profile_photo">
        <img src={userPhoto}></img>
      </div>
      <div className="user_profile_info">
        <span className="user_profile_info_name">{userName}</span>
        <span className="user_profile_info_level">{userLevel}</span>
        <progress className="user_profile_info_exp" value={userexp} max="100" />
      </div>
    </div>
  );
}

export default UserProfile;
