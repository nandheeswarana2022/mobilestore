
import React, { useState } from 'react';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { User, View } from '../types';

interface SignUpProps {
  onSignUp: (user: User) => void;
  setView: (view: View) => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSignUp, setView }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: User = { id: `user-${Date.now()}`, name, email };
        onSignUp(newUser);
    }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-brand-background">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-brand-text-primary">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input id="name" label="Full Name" type="text" value={name} onChange={e => setName(e.target.value)} required />
          <Input id="email" label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          
          <div>
            <Button type="submit" fullWidth>
              Create Account
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-brand-text-secondary">
          Already have an account?{' '}
          <button onClick={() => setView(View.Login)} className="font-semibold leading-6 text-brand-primary hover:text-blue-400">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};
