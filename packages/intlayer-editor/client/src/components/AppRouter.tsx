import type { FC, PropsWithChildren } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export const AppRouter: FC<PropsWithChildren> = ({ children }) => (
  <Router>
    <Routes>
      {/* Match all possible paths */}
      <Route path="*" element={children} />
    </Routes>
  </Router>
);
