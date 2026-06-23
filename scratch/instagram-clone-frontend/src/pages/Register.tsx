import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../layouts/AuthLayout';

interface RegisterFormInputs {
  username: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
}

export const Register: React.FC = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>();

  const passwordVal = watch('password');

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await registerUser(data.username, data.email, data.phone);
      navigate('/posts');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs px-3 py-2.5 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {/* Username */}
        <div>
          <input
            type="text"
            {...register('username', { required: 'Username is required' })}
            placeholder="Username"
            className="w-full text-xs bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-3 outline-none focus:border-gray-400 dark:focus:border-zinc-700"
          />
          {errors.username && (
            <p className="text-[10px] text-red-500 mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            placeholder="Email address"
            className="w-full text-xs bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-3 outline-none focus:border-gray-400 dark:focus:border-zinc-700"
          />
          {errors.email && (
            <p className="text-[10px] text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="text"
            {...register('phone')}
            placeholder="Phone number"
            className="w-full text-xs bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-3 outline-none focus:border-gray-400 dark:focus:border-zinc-700"
          />
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            placeholder="Password"
            className="w-full text-xs bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-3 outline-none focus:border-gray-400 dark:focus:border-zinc-700"
          />
          {errors.password && (
            <p className="text-[10px] text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm your password',
              validate: (val) => val === passwordVal || 'Passwords do not match'
            })}
            placeholder="Confirm password"
            className="w-full text-xs bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-3 outline-none focus:border-gray-400 dark:focus:border-zinc-700"
          />
          {errors.confirmPassword && (
            <p className="text-[10px] text-red-500 mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-ig-blue hover:bg-ig-hover-blue text-white rounded-lg font-bold text-xs shadow-sm hover:shadow transition-all disabled:opacity-50"
        >
          {isSubmitting ? 'Signing up...' : 'Sign up'}
        </button>
      </form>

      {/* Or Separator */}
      <div className="flex items-center my-6 w-full">
        <div className="flex-1 h-[1px] bg-gray-200 dark:bg-zinc-800" />
        <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-600 px-3">OR</span>
        <div className="flex-1 h-[1px] bg-gray-200 dark:bg-zinc-800" />
      </div>

      {/* Redirect Link */}
      <div className="text-center text-xs">
        <span className="text-gray-500">Have an account? </span>
        <Link to="/login" className="font-bold text-ig-blue hover:underline">
          Log in
        </Link>
      </div>
    </AuthLayout>
  );
};
