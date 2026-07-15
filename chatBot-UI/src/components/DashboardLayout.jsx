import Sidebar from './Sidebar';

const DashboardLayout = ({ children, onLogout }) => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar onLogout={onLogout} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
