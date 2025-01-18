import { FC, PropsWithChildren } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const AppRouter: FC<PropsWithChildren> = ({ children }) => (
  <Router>
    <Routes>
      {/* Match all possible paths */}
      <Route path="*" element={children} />
    </Routes>
  </Router>
);
