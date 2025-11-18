// Local Storage Service for LifeConnect
// Handles storing and retrieving user data, bookings, and emergency info

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContacts: EmergencyContact[];
  medicalHistory: string;
  allergies: string;
  bloodType: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface AmbulanceBooking {
  id: string;
  pickupLocation: string;
  destinationHospital: string;
  hospitalId: string;
  timestamp: string;
  status: "pending" | "accepted" | "arrived" | "completed";
  eta: string;
  ambulanceId: string;
  driverName: string;
  driverPhone: string;
}

export interface AccidentReport {
  id: string;
  location: string;
  injurySeverity: "minor" | "moderate" | "severe" | "critical";
  injuryDescription: string;
  timestamp: string;
  status: "reported" | "confirmed" | "en-route" | "at-location";
  nearestHospital: string;
  photos: string[];
}

export interface EmergencyCard {
  id: string;
  userId: string;
  qrCode: string;
  medicalHistory: string;
  allergies: string;
  bloodType: string;
  emergencyContacts: EmergencyContact[];
  lastUpdated: string;
}

// Default user data
const DEFAULT_USER: User = {
  id: "user-001",
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 98765 43210",
  dateOfBirth: "1990-05-15",
  address: "123 Main Street, Downtown, Hyderabad",
  emergencyContacts: [
    {
      id: "ec-001",
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+91 98765 43211"
    },
    {
      id: "ec-002",
      name: "Robert Smith",
      relationship: "Friend",
      phone: "+91 98765 43212"
    }
  ],
  medicalHistory: "No major medical conditions. Regular checkups done.",
  allergies: "Penicillin, Shellfish",
  bloodType: "O+"
};

// Storage keys
const STORAGE_KEYS = {
  USER: "lifeconnect_user",
  AMBULANCE_BOOKINGS: "lifeconnect_ambulance_bookings",
  ACCIDENT_REPORTS: "lifeconnect_accident_reports",
  EMERGENCY_CARDS: "lifeconnect_emergency_cards",
  DOCTOR_LOGIN: "lifeconnect_doctor_login",
  MEDICAL_FILES: "lifeconnect_medical_files"
};

// User functions
export function getUser(): User {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : DEFAULT_USER;
  } catch {
    return DEFAULT_USER;
  }
}

export function updateUser(user: Partial<User>): User {
  const current = getUser();
  const updated = { ...current, ...user };
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
  return updated;
}

export function addEmergencyContact(contact: EmergencyContact): User {
  const user = getUser();
  user.emergencyContacts.push(contact);
  return updateUser(user);
}

export function removeEmergencyContact(contactId: string): User {
  const user = getUser();
  user.emergencyContacts = user.emergencyContacts.filter(c => c.id !== contactId);
  return updateUser(user);
}

// Ambulance booking functions
export function getAmbulanceBookings(): AmbulanceBooking[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.AMBULANCE_BOOKINGS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function createAmbulanceBooking(booking: Omit<AmbulanceBooking, "id">): AmbulanceBooking {
  const bookings = getAmbulanceBookings();
  const newBooking: AmbulanceBooking = {
    ...booking,
    id: `booking-${Date.now()}`
  };
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEYS.AMBULANCE_BOOKINGS, JSON.stringify(bookings));
  return newBooking;
}

export function updateAmbulanceBooking(bookingId: string, updates: Partial<AmbulanceBooking>): AmbulanceBooking | null {
  const bookings = getAmbulanceBookings();
  const index = bookings.findIndex(b => b.id === bookingId);
  if (index === -1) return null;
  
  bookings[index] = { ...bookings[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.AMBULANCE_BOOKINGS, JSON.stringify(bookings));
  return bookings[index];
}

export function getLatestAmbulanceBooking(): AmbulanceBooking | null {
  const bookings = getAmbulanceBookings();
  return bookings.length > 0 ? bookings[bookings.length - 1] : null;
}

// Accident report functions
export function getAccidentReports(): AccidentReport[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ACCIDENT_REPORTS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function createAccidentReport(report: Omit<AccidentReport, "id">): AccidentReport {
  const reports = getAccidentReports();
  const newReport: AccidentReport = {
    ...report,
    id: `report-${Date.now()}`
  };
  reports.push(newReport);
  localStorage.setItem(STORAGE_KEYS.ACCIDENT_REPORTS, JSON.stringify(reports));
  return newReport;
}

export function updateAccidentReport(reportId: string, updates: Partial<AccidentReport>): AccidentReport | null {
  const reports = getAccidentReports();
  const index = reports.findIndex(r => r.id === reportId);
  if (index === -1) return null;
  
  reports[index] = { ...reports[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.ACCIDENT_REPORTS, JSON.stringify(reports));
  return reports[index];
}

export function getLatestAccidentReport(): AccidentReport | null {
  const reports = getAccidentReports();
  return reports.length > 0 ? reports[reports.length - 1] : null;
}

// Emergency card functions
export function getEmergencyCards(): EmergencyCard[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.EMERGENCY_CARDS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function createEmergencyCard(card: Omit<EmergencyCard, "id" | "lastUpdated">): EmergencyCard {
  const cards = getEmergencyCards();
  const newCard: EmergencyCard = {
    ...card,
    id: `card-${Date.now()}`,
    lastUpdated: new Date().toISOString()
  };
  cards.push(newCard);
  localStorage.setItem(STORAGE_KEYS.EMERGENCY_CARDS, JSON.stringify(cards));
  return newCard;
}

export function updateEmergencyCard(cardId: string, updates: Partial<EmergencyCard>): EmergencyCard | null {
  const cards = getEmergencyCards();
  const index = cards.findIndex(c => c.id === cardId);
  if (index === -1) return null;
  
  cards[index] = { 
    ...cards[index], 
    ...updates,
    lastUpdated: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.EMERGENCY_CARDS, JSON.stringify(cards));
  return cards[index];
}

// Doctor login functions
export interface DoctorLogin {
  id: string;
  email: string;
  hospital: string;
  specialization: string;
  licenseNumber: string;
}

export function getDoctorLogin(): DoctorLogin | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DOCTOR_LOGIN);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setDoctorLogin(doctor: DoctorLogin): void {
  localStorage.setItem(STORAGE_KEYS.DOCTOR_LOGIN, JSON.stringify(doctor));
}

export function clearDoctorLogin(): void {
  localStorage.removeItem(STORAGE_KEYS.DOCTOR_LOGIN);
}

// Medical file storage
export interface MedicalFile {
  id: string;
  name: string;
  category: "prescriptions" | "reports" | "scans" | "discharge" | "vaccination";
  type: string;
  date: string;
  size: number;
  data?: string; // base64 encoded file data
}

export function getMedicalFiles(): MedicalFile[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.MEDICAL_FILES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addMedicalFile(file: Omit<MedicalFile, "id">): MedicalFile {
  const files = getMedicalFiles();
  const newFile: MedicalFile = {
    ...file,
    id: `file-${Date.now()}`
  };
  files.push(newFile);
  localStorage.setItem(STORAGE_KEYS.MEDICAL_FILES, JSON.stringify(files));
  return newFile;
}

export function deleteMedicalFile(fileId: string): void {
  const files = getMedicalFiles();
  const filtered = files.filter(f => f.id !== fileId);
  localStorage.setItem(STORAGE_KEYS.MEDICAL_FILES, JSON.stringify(filtered));
}

export function getMedicalFilesByCategory(category: string): MedicalFile[] {
  return getMedicalFiles().filter(f => f.category === category);
}

// Clear all data
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}
