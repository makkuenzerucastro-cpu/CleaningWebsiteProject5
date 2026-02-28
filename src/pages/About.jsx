import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Heart, Shield, Award, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Care & Dedication",
      description: "We treat every space as if it were our own, with attention to every detail.",
      color: "bg-rose-100 text-rose-500",
    },
    {
      icon: Shield,
      title: "Trust & Reliability",
      description: "Count on us to show up on time and deliver consistent, quality results.",
      color: "bg-sky-100 text-sky-600",
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "We use professional-grade equipment and eco-friendly products.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our priority. We listen and adapt to your needs.",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-green-500">JES Cleaning</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're more than just a cleaning service — we're your partners in creating healthier, happier spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Our Story
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Built on Passion for Clean Spaces
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  JES Cleaning Services was founded with a simple mission: to provide exceptional cleaning services that make a real difference in people's lives.
                </p>
                <p>
                  We understand that a clean environment isn't just about appearances — it's about health, comfort, and peace of mind. That's why we approach every job with dedication and care.
                </p>
                <p>
                  Our team consists of trained professionals who share our commitment to excellence. We use eco-friendly products that are safe for your family, pets, and the environment.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-green-100 via-sky-50 to-yellow-50 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Sparkles className="w-16 h-16 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">JES Cleaning</p>
                  <p className="text-gray-600">Services</p>
                </div>
                <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-200 rounded-full opacity-50" />
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-sky-200 rounded-full opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do at JES Cleaning Services.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 ${value.color} rounded-xl flex items-center justify-center mb-4`}>
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Experience the JES Cleaning difference. Contact us today!
          </p>
          <Link to={createPageUrl("Contact")}>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}