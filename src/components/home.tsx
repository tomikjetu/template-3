import React from "react";
import HeroSection from "./landing/HeroSection";
import BioSection from "./landing/BioSection";
import ServicesGrid from "./landing/ServicesGrid";
import TestimonialsCarousel from "./landing/TestimonialsCarousel";
import FloatingContactForm from "./landing/FloatingContactForm";

interface HomePageProps {
  heroProps?: React.ComponentProps<typeof HeroSection>;
  bioProps?: React.ComponentProps<typeof BioSection>;
  servicesProps?: React.ComponentProps<typeof ServicesGrid>;
  testimonialsProps?: React.ComponentProps<typeof TestimonialsCarousel>;
  contactFormProps?: React.ComponentProps<typeof FloatingContactForm>;
}

const HomePage = ({
  heroProps,
  bioProps,
  servicesProps,
  testimonialsProps,
  contactFormProps,
}: HomePageProps = {}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main content container */}
      <main>
        {/* Hero Section */}
        <section id="hero">
          <HeroSection {...heroProps} />
        </section>

        {/* Bio Section */}
        <section id="about">
          <BioSection {...bioProps} />
        </section>

        {/* Services Grid */}
        <section id="services">
          <ServicesGrid {...servicesProps} />
        </section>

        {/* Testimonials Carousel */}
        <section id="testimonials">
          <TestimonialsCarousel {...testimonialsProps} />
        </section>

        {/* Floating Contact Form - Fixed Position */}
        <FloatingContactForm {...contactFormProps} />
      </main>
      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Professional Tutoring Services.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
