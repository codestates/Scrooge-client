import React from 'react';
import { useSelector } from 'react-redux';
import MiniLoading from './MiniLoading';

function UserProfile() {
  const userInfoReducer = useSelector((state) => state.userInfoReducer);
  const { loading, userName, userPhoto, userLevel, userEXP } =
    userInfoReducer.userInfo;
  return (
    <div className="user_profile">
      {loading ? (
        <MiniLoading />
      ) : (
        <>
          <div className="user_profile_photo">
            <img src={userPhoto} alt=""></img>
          </div>
          <div className="user_profile_info">
            <span className="user_profile_info_name">
              {userName}
              <span className="user_profile_info_level">{userLevel}</span>
            </span>
            <progress
              className="user_profile_info_exp"
              value={userEXP}
              max="100"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;
