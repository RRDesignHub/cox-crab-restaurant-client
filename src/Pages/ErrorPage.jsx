import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] text-center px-4">
      <div className="bg-[#D9EAFD] shadow-lg rounded-lg p-8 md:p-12 max-w-lg">
        <h1 className="text-6xl font-nunito font-bold text-[#2E384D] mb-4">404</h1>
        <p className="text-xl font-nunito font-bold text-[#2E384D] mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <div className="flex flex-col justify-center md:flex-row gap-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline font-heebo text-[#2E384D] border-[#9AA6B2] hover:bg-[#9AA6B2] hover:text-white w-full md:w-auto"
          >
            Go Back
          </button>
          <Link
            to="/"
            className="btn bg-[#9AA6B2] font-heebo text-white hover:bg-[#BCCCDC] w-full md:w-auto"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

