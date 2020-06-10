import React from 'react';

const AdminUserList = () => {
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

export default AdminUserList;
