import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNotification } from "../../context/NotificationContext";
import { applyPartner, applyRestaurant } from "../../services/onboardingService";

const fields = {
  restaurant: [["businessName", "Restaurant name"], ["ownerName", "Owner full name"], ["phone", "Business phone"], ["email", "Business email"], ["address", "Full restaurant address"], ["fssaiNumber", "FSSAI licence number"], ["gstNumber", "GSTIN (if registered)"], ["panNumber", "PAN number"]],
  delivery: [["phone", "Mobile number"], ["vehicle", "Vehicle (bicycle, bike, scooter, car)"], ["vehicleNumber", "Vehicle registration number"], ["drivingLicense", "Driving licence number"], ["identityNumber", "Government ID number"], ["accountHolder", "Bank account holder"], ["accountNumber", "Bank account number"], ["ifsc", "IFSC code"], ["availability", "Availability (e.g. evenings)"]]
};

export default function PartnerPortal({ type = "restaurant" }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const isRestaurant = type === "restaurant";
  const change = (key, value) => setForm({ ...form, [key]: value });

  const submit = async (event) => {
    event.preventDefault();
    const latitude = Number(form.latitude);
    const longitude = Number(form.longitude);
    if (isRestaurant && (!Number.isFinite(latitude) || !Number.isFinite(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180)) {
      showNotification("Latitude must be -90 to 90 and longitude must be -180 to 180.", "error");
      return;
    }
    setLoading(true);
    try {
      const payload = isRestaurant
        ? { ...form, cuisine: form.cuisine?.split(",").map((value) => value.trim()).filter(Boolean), location: { latitude, longitude }, bankDetails: { accountHolder: form.accountHolder, accountNumber: form.accountNumber, ifsc: form.ifsc } }
        : { ...form, identity: { type: "Government ID", number: form.identityNumber }, bank: { accountHolder: form.accountHolder, accountNumber: form.accountNumber, ifsc: form.ifsc } };
      const result = isRestaurant ? await applyRestaurant(payload) : await applyPartner(payload);
      showNotification(result.message);
    } catch (error) {
      showNotification(error.response?.data?.message || "Please review the details and try again.", "error");
    } finally { setLoading(false); }
  };

  return <><Navbar /><main className="page-shell py-10"><div className="mx-auto max-w-3xl"><p className="section-kicker">{isRestaurant ? "Restaurant partner" : "Delivery partner"}</p><h1 className="section-title">{isRestaurant ? "Grow your restaurant with FoodExpress" : "Deliver on your schedule"}</h1><p className="mt-3 text-slate-500">Your details are securely reviewed by our onboarding team. Approval is required before your dashboard is activated.</p><form onSubmit={submit} className="soft-card mt-8 grid gap-5 p-6 sm:grid-cols-2">{fields[type].map(([key, label]) => <label key={key} className="text-sm font-bold text-slate-700">{label}<input required={!label.includes("if registered")} value={form[key] || ""} onChange={(event) => change(key, event.target.value)} className="mt-2 w-full p-3" placeholder={label} /></label>)}{isRestaurant && <><label className="text-sm font-bold">Cuisines<input className="mt-2 w-full p-3" placeholder="Indian, Chinese" onChange={(event) => change("cuisine", event.target.value)} /></label><label className="text-sm font-bold">Latitude <span className="font-normal text-slate-500">(-90 to 90)</span><input required className="mt-2 w-full p-3" type="number" min="-90" max="90" step="any" placeholder="e.g. 30.3165" onChange={(event) => change("latitude", event.target.value)} /></label><label className="text-sm font-bold">Longitude <span className="font-normal text-slate-500">(-180 to 180)</span><input required className="mt-2 w-full p-3" type="number" min="-180" max="180" step="any" placeholder="e.g. 78.0322" onChange={(event) => change("longitude", event.target.value)} /></label></>}<label className="text-sm font-bold">Bank account holder<input required className="mt-2 w-full p-3" onChange={(event) => change("accountHolder", event.target.value)} /></label><label className="text-sm font-bold">Bank account number<input required className="mt-2 w-full p-3" onChange={(event) => change("accountNumber", event.target.value)} /></label><label className="text-sm font-bold">IFSC code<input required className="mt-2 w-full p-3" onChange={(event) => change("ifsc", event.target.value)} /></label><div className="sm:col-span-2 rounded-xl bg-orange-50 p-4 text-sm text-slate-600">Use your exact business coordinates. For Dehradun, an example is latitude 30.3165 and longitude 78.0322. Menu items, images and base prices are entered manually after approval.</div><button disabled={loading} className="sm:col-span-2 rounded-xl bg-slate-900 px-5 py-4 font-bold text-white">{loading ? "Submitting…" : "Submit for verification"}</button></form></div></main><Footer /></>;
}
