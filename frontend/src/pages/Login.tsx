import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, CheckCircle, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

declare global {
  interface Window {
    google?: any;
  }
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const classNames = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(' ');
};

const LoginPage: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.google && !document.getElementById('google-identity')) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.id = 'google-identity';
      document.body.appendChild(script);
    }
  }, []);

  const validateEmail = (email: string) => {
    return email.endsWith('@nmamit.in');
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email must end with @nmamit.in';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);

    if (!window.google?.accounts?.id) {
      alert('Google Sign-In not loaded yet. Please wait or try again.');
      setIsLoading(false);
      return;
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCallback,
    });

    window.google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        setIsLoading(false);
      }
    });
  };

  const handleGoogleCallback = async (response: any) => {
    setIsLoading(true);
    try {
      if (!response?.credential) {
        throw new Error('No Google Credential received.');
      }

      const BASE_URL = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: response.credential }),
      });

      const data = await res.json();
      if (res.ok) {
        login(data.email, data.name);
        navigate('/');
      } else {
        alert(data.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      alert('Sign-in failed, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);

    setTimeout(() => {
      if (isLogin) {
        login(formData.email, formData.name || formData.email.split('@')[0]);
      } else {
        login(formData.email, formData.name);
      }
      setIsLoading(false);
      navigate('/');
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Theme Toggle Button - Top Right */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-100/10 hover:bg-gray-100/20 transition-colors"
      >
        {isDark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Left Panel - Login Form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-50">
            <span>HackerEarth</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form className={classNames("flex flex-col gap-6")} onSubmit={handleSubmit}>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Login to your account</h1>
                <p className="text-balance text-sm text-gray-500 dark:text-gray-300">Sign in with your NMAMIT Google account</p>
              </div>

              {/* Google Sign In Button */}
              <button 
                type="button" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background
                              h-10 px-4 py-2 w-full
                              border border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900
                              text-gray-900 dark:text-gray-50" 
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </button>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 text-center mt-6">
                <div className="backdrop-blur-sm rounded-xl p-3 border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <Shield className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-500 dark:text-gray-300">Secure</p>
                </div>
                <div className="backdrop-blur-sm rounded-xl p-3 border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-500 dark:text-gray-300">Verified</p>
                </div>
                <div className="backdrop-blur-sm rounded-xl p-3 border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <User className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-500 dark:text-gray-300">NMAMIT Only</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Panel - Hero Section */}
      <div className="relative hidden lg:block bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-pink-800/60">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)] opacity-20"></div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
        
        {/* Hero Content */}
        <div className="absolute bottom-8 left-8 z-20 max-w-lg">
          <div className="text-left">
            {/* Badge with glass effect */}
            <div
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-6 relative border border-white/20"
              style={{
                filter: "url(#glass-effect)",
              }}
            >
              <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="text-white/90 text-sm font-light relative z-10">✨ HackerEarth Community</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-6">
              <span className="font-medium italic">Code, Compete, Conquer</span>
            </h1>

            {/* Description */}
            <p className="text-sm font-light text-white/80 mb-8 leading-relaxed max-w-md">
              Take on coding challenges, sharpen your skills, and climb the leaderboard. Push your limits with every problem you solve.
            </p>

            {/* Buttons with glass effect */}
            <div className="flex items-center gap-4 flex-wrap">
              <div 
                className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-sm transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer backdrop-blur-sm"
                style={{ filter: "url(#glass-effect)" }}
              >
                Learn More
              </div>
              <div 
                className="px-8 py-3 rounded-full bg-white/90 text-black font-normal text-sm transition-all duration-200 hover:bg-white cursor-pointer backdrop-blur-sm"
                style={{ filter: "url(#glass-effect)" }}
              >
                Join Community
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* SVG filter for glass effect */}
      <svg width="0" height="0" className="absolute">
        <filter id="glass-effect" x="0" y="0" width="100%" height="100%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="glass" />
          <feBlend in="SourceGraphic" in2="glass" />
        </filter>
      </svg>
    </div>
  );
};

export default LoginPage;