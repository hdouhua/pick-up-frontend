import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from '../components/App';
import Employee from '../components/employee';
import Setting from '../components/setting';

const RootRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);

export const AppRouter = () => (
  <Routes>
    <Route path="/setting" element={<Setting />} />
    <Route path="/*" element={<Employee />} />
  </Routes>
);

export default RootRouter;
