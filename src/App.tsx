/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar, Footer } from "./lib/layout";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";
import ExploreMap from "./pages/ExploreMap";
import TrackIssue from "./pages/TrackIssue";
import Admin from "./pages/Admin";
import { Chatbot } from "./components/Chatbot";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans transition-colors">
        <Navbar />
        <main className="flex-grow flex flex-col pt-16">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/map" element={<ExploreMap />} />
            <Route path="/track" element={<TrackIssue />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Chatbot />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
