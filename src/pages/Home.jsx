import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Sparkles, Home as HomeIcon, Building2, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const services = [
    { icon: HomeIcon, title: "Residential Cleaning", color: "bg-green-100 text-green-600" },
    { icon: Sparkles, title: "Deep Cleaning", color: "bg-sky-100 text-sky-600" },
    { icon: Truck, title: "Move-In/Move-Out", color: "bg-coral-100 text-orange-500" },
    { icon: Building2, title: "Office Cleaning", color: "bg-yellow-100 text-yellow-600" },
  ];

  const features = [
    "Eco-friendly products",
    "Trained professionals",
    "Flexible scheduling",
    "Satisfaction guaranteed",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 w-full">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
              Cleaning With Care,{" "}
              <span className="text-green-400">Sparkling Everywhere!</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              We bring freshness and shine to your home and office. Experience the joy of spotless spaces with JES Cleaning Services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Contact")}>
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full">
                  Get a Free Quote
                </Button>
              </Link>
              <Link to={createPageUrl("Services")}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg rounded-full">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-green-500 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-center gap-2 text-white">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From regular home cleaning to specialized deep cleaning, we have you covered.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{service.title}</h3>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to={createPageUrl("Services")}>
              <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 rounded-full px-6">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Choose <span className="text-green-500">JES Cleaning?</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At JES Cleaning Services, we believe a clean space is a happy space. Our dedicated team brings professionalism, attention to detail, and genuine care to every cleaning job.
              </p>
              <ul className="space-y-3 mb-8">
                {["Experienced & trustworthy team", "Customized cleaning plans", "Competitive pricing", "100% satisfaction guaranteed"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to={createPageUrl("About")}>
                <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6">
                  Learn More About Us
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-green-100 to-sky-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Sparkles className="w-12 h-12 text-green-500" />
                  </div>
                  <p className="text-gray-700 font-medium">Sparkling Clean</p>
                  <p className="text-gray-500 text-sm">Every Time</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-200 rounded-2xl opacity-60" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-coral-200 rounded-xl opacity-60" style={{backgroundColor: '#fed7d7'}} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready for a Sparkling Clean Space?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your cleaning needs. We're here to help!
          </p>
          <Link to={createPageUrl("Contact")}>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}