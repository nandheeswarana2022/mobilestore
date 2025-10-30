
import React, { useState } from 'react';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { User, View } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  setView: (view: View) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, setView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Dummy authentication
        const dummyUser: User = {
            id: 'user-123',
            name: email.split('@')[0],
            email: email,
        };
        onLogin(dummyUser);
    }
  
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-brand-background">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-brand-text-primary">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input id="email" label="Email address" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input id="password" label="Password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required />

          <div>
            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-brand-text-secondary">
          Not a member?{' '}
          <button onClick={() => setView(View.SignUp)} className="font-semibold leading-6 text-brand-primary hover:text-blue-400">
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};
