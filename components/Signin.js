import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ color: '#f15bb5' }}>Welcome to finally staying on task!</h1>
      <h5 style={{ color: '#00bbf9' }}>Click the button below to login!</h5>
      <Button type="button" className="login-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
