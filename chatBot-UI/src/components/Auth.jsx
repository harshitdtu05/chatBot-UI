import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import Input from './ui/Input';
import PasswordInput from './ui/PasswordInput';
import Button from './ui/Button';

const Auth = ({ onAuth }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, [isLogin]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (backendError) {
      setBackendError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setBackendError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/login' : '/signup';
      const response = await axios.post(`${BASE_URL}${endpoint}`, formData);
      onAuth(response.data);
      navigate('/dashboard');
    } catch (err) {
      setBackendError(err.response?.data?.message || `${isLogin ? 'Login' : 'Signup'} failed`);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.email && formData.password && validateEmail(formData.email) && formData.password.length >= 6;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9M7.5 12h9m-9 3.75h9" />
            </svg>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600">
            Sign in to continue to your AI Workspace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <Input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="name@company.com"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />

          <PasswordInput
            id="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a
              href="#forgot-password"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            loading={loading}
            disabled={!isFormValid}
          >
            {isLogin ? 'Sign in' : 'Sign up'}
          </Button>

          {backendError && (
            <div 
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
              role="alert"
            >
              {backendError}
            </div>
          )}
        </form>

        <p className="text-center text-gray-600 mt-8">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
              setBackendError('');
            }}
            className="text-gray-900 font-medium hover:underline transition-colors"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
