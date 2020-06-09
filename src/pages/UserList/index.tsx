import React from 'react';

const UserList = () => {
  console.log('userlist');

  return (
    <div
      onClick={() => {
        console.log('click');
      }}
    >
      user list
    </div>
  );
};

export default UserList;
