import React, { useState } from "react";
import { Mail, Phone, MapPin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "", description: "" });
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.integrations.Core.SendEmail({
      to: "jesree@jescleaningservices.ca",
      subject: `New Quote Request from ${form.name}`,
      body: `New quote request received:\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nType of Cleaning: ${form.type}\n\nDescription:\n${form.description}`
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Get in <span className="text-green-500">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions or ready to schedule a cleaning? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Get a Free Quote</h2>
          <p className="text-gray-600 mb-4">Please, fill in the following fields:</p>
          <ul className="list-disc list-inside text-gray-500 text-sm mb-8 space-y-1">
            <li>Name</li>
            <li>Phone Number</li>
            <li>Email Address</li>
            <li>Type of Cleaning Required?</li>
            <li>Please give us a brief description of the cleaning job you'd like to have done. For the most accurate quote include any specific details if possible.</li>
          </ul>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <p className="text-green-700 font-semibold text-lg">Thank you! We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-4 border border-red-400 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-4 border border-red-400 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-4 border border-red-400 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
              />
              <select
                required
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-4 border border-red-400 rounded-xl text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white appearance-none"
              >
                <option value="" disabled>Type of Cleaning Required?</option>
                <option value="Residential Cleaning">Residential Cleaning</option>
                <option value="Deep Cleaning">Deep Cleaning</option>
                <option value="Move-In/Move-Out">Move-In/Move-Out</option>
                <option value="Office Cleaning">Office Cleaning</option>
                <option value="Other">Other</option>
              </select>
              <textarea
                placeholder="Please give us a brief description of the cleaning job you'd like to have done. For the most accurate quote include any specific details if possible."
                required
                rows={5}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-4 border border-red-400 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white resize-none"
              />
              <Button type="submit" disabled={loading} className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg rounded-xl">
                {loading ? "Sending..." : "Submit Quote Request"}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Contact Information
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Reach us directly using the information below and we'll get back to you as soon as possible.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <a href="mailto:jesree@jescleaningservices.ca" className="text-gray-600 hover:text-green-600 transition-colors block">jesree@jescleaningservices.ca</a>
                <a href="mailto:jesjaned@yahoo.com" className="text-gray-600 hover:text-green-600 transition-colors block">jesjaned@yahoo.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                <a href="tel:5879986717" className="text-gray-600 hover:text-green-600 transition-colors">587.998.6717</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Facebook className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Facebook</h3>
                <a href="https://www.facebook.com/share/185Ws7VpMp/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition-colors">JES Cleaning Services</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Service Area</h3>
                <p className="text-gray-600">Serving the greater metropolitan area</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-green-50 rounded-2xl border border-green-100">
            <p className="text-sm text-gray-700 font-medium">Jesree Jane Bourque</p>
            <p className="text-sm text-gray-600">Owner / Lead Service Operator</p>
            <p className="text-sm text-green-600 font-medium">Registered & Insured</p>
          </div>
        </div>
      </section>
    </div>
  );
}