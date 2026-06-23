import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../layouts/AuthLayout';

interface LoginFormInputs {
  emailOrUsername: string;
  rememberMe: boolean;
}

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Simulate/call login function
      await login(data.emailOrUsername.includes('@') ? data.emailOrUsername : '', !data.emailOrUsername.includes('@') ? data.emailOrUsername : '');
      navigate('/posts');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Error Notification */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs px-3 py-2.5 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {/* Username/Email Input */}
        <div>
          <input
            type="text"
            {...register('emailOrUsername', { required: 'Email or Username is required' })}
            placeholder="Username or email"
            className="w-full text-xs bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-3 outline-none focus:border-gray-400 dark:focus:border-zinc-700"
          />
          {errors.emailOrUsername && (
            <p className="text-[10px] text-red-500 mt-1">{errors.emailOrUsername.message}</p>
          )}
        </div>

        {/* Dummy Password Input */}
        <div>
          <input
            type="password"
            placeholder="Password"
            defaultValue="password123"
            className="w-full text-xs bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-3 outline-none focus:border-gray-400 dark:focus:border-zinc-700"
          />
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="rounded text-ig-blue focus:ring-0"
            />
            <span>Remember me</span>
          </label>
          <span className="hover:underline cursor-pointer">Forgot password?</span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-ig-blue hover:bg-ig-hover-blue text-white rounded-lg font-bold text-xs shadow-sm hover:shadow transition-all disabled:opacity-50"
        >
          {isSubmitting ? 'Logging in...' : 'Log in'}
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
        <span className="text-gray-500">Don't have an account? </span>
        <Link to="/register" className="font-bold text-ig-blue hover:underline">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};
