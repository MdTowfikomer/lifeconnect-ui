import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Hospitals from "./pages/Hospitals";
import HospitalDetail from "./pages/HospitalDetail";
import Ambulance from "./pages/Ambulance";
import AccidentReport from "./pages/AccidentReport";
import MedicalVault from "./pages/MedicalVault";
import EmergencyCard from "./pages/EmergencyCard";
import DoctorPortal from "./pages/DoctorPortal";
import PatientOverview from "./pages/PatientOverview";
import HospitalAdmin from "./pages/HospitalAdmin";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/hospitals" element={<Layout><Hospitals /></Layout>} />
          <Route path="/hospitals/:id" element={<Layout><HospitalDetail /></Layout>} />
          <Route path="/ambulance" element={<Layout><Ambulance /></Layout>} />
          <Route path="/accident-report" element={<Layout><AccidentReport /></Layout>} />
          <Route path="/medical-vault" element={<Layout><MedicalVault /></Layout>} />
          <Route path="/emergency-card" element={<Layout><EmergencyCard /></Layout>} />
          <Route path="/doctor-portal" element={<Layout><DoctorPortal /></Layout>} />
          <Route path="/doctor-portal/patient/:id" element={<Layout><PatientOverview /></Layout>} />
          <Route path="/hospital-admin" element={<Layout><HospitalAdmin /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
