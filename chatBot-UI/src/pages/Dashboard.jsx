import Button from '../components/ui/Button';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      {/* Empty State Illustration */}
      <div className="mb-8">
        <div className="w-64 h-64 bg-gray-50 rounded-2xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-32 h-32 text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-semibold text-gray-900 mb-3 text-center">
        Welcome to Enterprise AI Assistant
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Upload documents to build your organization's knowledge base.
      </p>

      {/* Primary CTA */}
      <Button className="max-w-xs">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        Upload Document
      </Button>
    </div>
  );
};

export default Dashboard;
