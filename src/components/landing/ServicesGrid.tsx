import React from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, GraduationCap, Brain } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({
  icon,
  title = "Service Title",
  description = "Service description goes here",
}: ServiceCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Card>
  );
};

interface ServicesGridProps {
  services?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

const ServicesGrid = ({ services }: ServicesGridProps) => {
  const defaultServices = [
    {
      icon: <BookOpen size={24} />,
      title: "One-on-One Tutoring",
      description:
        "Personalized learning sessions tailored to your specific needs and learning style.",
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Test Preparation",
      description:
        "Comprehensive preparation for standardized tests with proven strategies.",
    },
    {
      icon: <Brain size={24} />,
      title: "Subject Mastery",
      description:
        "In-depth coverage of specific subjects to build strong foundational knowledge.",
    },
  ];

  const displayServices = services || defaultServices;

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our range of specialized tutoring services designed to
            help you achieve your academic goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
