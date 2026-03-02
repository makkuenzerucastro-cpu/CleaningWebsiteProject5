import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Sparkles, Truck, Building2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Services() {
  const services = [
    {
      icon: Home,
      title: "Residential Cleaning",
      description: "Regular home cleaning to keep your living space fresh, tidy, and comfortable. Perfect for busy families and individuals.",
      features: ["Dust surfaces (shelves, tables, windowsills)", "Vacuum carpet and rugs", "Sweep/vacuum and mop floors", "Empty trash bins and replace liners", "Clean mirrors and glass surfaces", "Lightly dust ceiling fans and fixtures"],
      color: "bg-green-500",
      accent: "bg-green-100 text-green-600",
    },
    {
      icon: Sparkles,
      title: "Deep Cleaning",
      description: "Thorough top-to-bottom cleaning that reaches every corner. Ideal for seasonal cleaning or special occasions.",
      features: ["Everything in standard cleaning", "Inside appliances & microwave", "Scrub shower/tub (remove soap scum)", "Baseboards & moldings", "Spot clean cabinet doors", "Tidy up and organize items"],
      color: "bg-sky-500",
      accent: "bg-sky-100 text-sky-600",
    },
    {
      icon: Truck,
      title: "Move-In / Move-Out Cleaning",
      description: "Make your move stress-free with our comprehensive cleaning service for old or new homes.",
      features: ["Full empty space cleaning", "Cabinet interiors", "All fixtures & appliances", "Bathrooms deep cleaned", "Floors swept, vacuumed & mopped", "Ready for move-in condition"],
      color: "bg-orange-400",
      accent: "bg-orange-100 text-orange-500",
    },
    {
      icon: Building2,
      title: "Maintenance Cleaning",
      description: "Keep your space consistently clean with our regular maintenance cleaning service.",
      features: ["Wipe down surfaces", "Vacuum and mop floors", "Trash removal", "Bathroom sanitation", "Kitchen wipe-down", "Tidy common areas"],
      color: "bg-yellow-500",
      accent: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: Sparkles,
      title: "Airbnb Turnovers",
      description: "Fast, reliable turnovers between guests. We make sure your property is guest-ready every time.",
      features: ["Make bed / change sheets", "Full bathroom clean", "Kitchen wipe-down", "Restock supplies (if provided)", "Dust & vacuum all rooms", "Quick turnaround guaranteed"],
      color: "bg-pink-500",
      accent: "bg-pink-100 text-pink-600",
    },
    {
      icon: Building2,
      title: "Office & Commercial",
      description: "Professional cleaning services for offices and commercial spaces of all sizes.",
      features: ["Desk & workspace cleaning", "Common area cleaning", "Restroom sanitation", "Break room cleaning", "Trash removal", "Floor vacuuming & mopping"],
      color: "bg-indigo-500",
      accent: "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-green-500">Services</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              From regular maintenance to deep cleaning, we offer comprehensive solutions for all your cleaning needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${service.color} p-6`}>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-3">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full ${service.accent} flex items-center justify-center flex-shrink-0`}>
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started with JES Cleaning is simple and straightforward.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Contact Us", description: "Reach out via our contact form or phone to tell us about your cleaning needs." },
              { step: "2", title: "Get a Quote", description: "We'll provide a free, no-obligation quote based on your requirements." },
              { step: "3", title: "Enjoy Clean", description: "Schedule your cleaning and enjoy a sparkling clean space!" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Contact us today for a free quote on any of our services.
          </p>
          <Link to={createPageUrl("Contact")}>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full">
              Request a Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}