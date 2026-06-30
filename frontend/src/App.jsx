import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LoginModal from './pages/LoginModal';
import SignupModal from './pages/SignupModal';

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              onLoginOpen={() => setLoginOpen(true)}
              onSignupOpen={() => setSignupOpen(true)}
            />
          }
        />
        <Route path="/app" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Modals */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
<SignupModal
  open={signupOpen}
  onClose={() => setSignupOpen(false)}
  onSwitchToLogin={() => {
    setSignupOpen(false);
    setLoginOpen(true);
  }}
/>
    </>
  );
}

export default App;