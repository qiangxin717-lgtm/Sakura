import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { BottomNav } from '@/components/layout/BottomNav';
import { HomeSection } from '@/sections/HomeSection';
import { ScenariosSection } from '@/sections/ScenariosSection';
import { PracticeSection } from '@/sections/PracticeSection';
import { CommunitySection } from '@/sections/CommunitySection';
import { ProfileSection } from '@/sections/ProfileSection';
import { AdminSection } from '@/sections/AdminSection';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user || profile?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/scenarios" element={<ScenariosSection />} />
          <Route path="/practice" element={<PracticeSection />} />
          <Route path="/community" element={<CommunitySection />} />
          <Route path="/profile" element={<ProfileSection />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminSection />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

export default App;
