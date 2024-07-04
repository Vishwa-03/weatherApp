// src/components/Auth/LogOut.js
import React from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { Button } from '@mui/material';

const LogOut = () => {
  const handleLogOut = async () => {
    await signOut(auth);
  };

  return (
    <Button onClick={handleLogOut}>Log Out</Button>
  );
};

export default LogOut;
