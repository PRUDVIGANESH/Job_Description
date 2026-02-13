
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-bg">
            <Navigation />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
