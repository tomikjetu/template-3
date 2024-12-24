import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  title = "Expert Tutoring for Academic Excellence",
  subtitle = "Personalized learning experiences to help you achieve your academic goals",
  backgroundImage = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
  ctaText = "Book Trial Lesson",
  onCtaClick = () => console.log("CTA clicked"),
}: HeroSectionProps) => {
  return (
    <div className="relative h-[800px] w-full bg-white">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-2xl">
          {title}
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
          {subtitle}
        </p>

        <Button
          size="lg"
          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-6 text-lg"
          onClick={onCtaClick}
        >
          <CalendarDays className="mr-2 h-5 w-5" />
          {ctaText}
        </Button>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default HeroSection;
