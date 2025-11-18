import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "@/lib/localStorage";

export default function PatientSurvey() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bloodGroup: "",
    allergies: "",
    surgeries: "",
    chronicDiseases: "",
    medications: "",
    emergencyContact: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const medicalHistory = `Past Surgeries: ${form.surgeries}\nChronic Diseases: ${form.chronicDiseases}\nCurrent Medications: ${form.medications}`;
    
    updateUser({
      bloodType: form.bloodGroup,
      allergies: form.allergies,
      medicalHistory: medicalHistory,
      emergencyContacts: [{
        id: `ec-${Date.now()}`,
        name: "Emergency Contact",
        relationship: "Unknown",
        phone: form.emergencyContact
      }]
    });

    alert("Survey saved successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-200 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-xl border border-sky-100">
        
        <h1 className="text-3xl font-bold text-sky-700 mb-2">Medical Information</h1>
        <p className="text-gray-600 mb-8">
          Please provide your medical details to help doctors respond instantly in emergencies.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BLOOD GROUP */}
          <div>
            <label className="font-medium">Blood Group</label>
            <select
              name="bloodGroup"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white"
              required
            >
              <option value="">Select Blood Group</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>O+</option><option>O-</option>
              <option>AB+</option><option>AB-</option>
            </select>
          </div>

          {/* ALLERGIES */}
          <div>
            <label className="font-medium">Allergies</label>
            <textarea
              name="allergies"
              placeholder="Example: Dust allergy, antibiotic allergy…"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white"
            />
          </div>

          {/* SURGERIES */}
          <div>
            <label className="font-medium">Past Surgeries</label>
            <textarea
              name="surgeries"
              placeholder="Example: Appendix removal (2021)"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white"
            />
          </div>

          {/* CHRONIC DISEASES */}
          <div>
            <label className="font-medium">Chronic Diseases</label>
            <textarea
              name="chronicDiseases"
              placeholder="Example: Diabetes, asthma…"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white"
            />
          </div>

          {/* MEDICATIONS */}
          <div>
            <label className="font-medium">Current Medications</label>
            <textarea
              name="medications"
              placeholder="Example: Metformin 500mg daily"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white"
            />
          </div>

          {/* EMERGENCY CONTACT */}
          <div>
            <label className="font-medium">Emergency Contact Number</label>
            <input
              type="text"
              name="emergencyContact"
              placeholder="9876543210"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white"
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-sky-600 text-white text-lg rounded-xl hover:bg-sky-700 transition"
          >
            Save & Continue
          </button>

        </form>
      </div>
    </div>
  );
}