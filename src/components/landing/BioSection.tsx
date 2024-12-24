import React from "react";
import { Card } from "@/components/ui/card";

interface BioSectionProps {
  name?: string;
  title?: string;
  bio?: string;
  credentials?: string[];
  specialties?: string[];
  imageUrl?: string;
}

const BioSection = ({
  name = "Dr. Sarah Johnson",
  title = "Professional Mathematics & Physics Tutor",
  bio = "With over 15 years of experience in education, I specialize in making complex concepts accessible to students of all levels. My approach combines rigorous academic understanding with practical applications.",
  credentials = [
    "Ph.D. in Physics from MIT",
    "M.Sc. in Mathematics from Stanford",
    "Certified Advanced Placement (AP) Instructor",
  ],
  specialties = [
    "Advanced Mathematics",
    "Quantum Physics",
    "SAT/ACT Prep",
    "College Admissions Counseling",
  ],
  imageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=chad",
}: BioSectionProps) => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image Column - 40% width on desktop */}
          <div className="w-full md:w-2/5">
            <div className="aspect-square rounded-full overflow-hidden border-4 border-blue-600 shadow-lg">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bio Content Column - 60% width on desktop */}
          <div className="w-full md:w-3/5">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{name}</h2>
            <h3 className="text-xl text-blue-600 mb-4">{title}</h3>

            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{bio}</p>

            <Card className="p-6 bg-gray-50 mb-6">
              <h4 className="text-lg font-semibold mb-3">Credentials</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {credentials.map((credential, index) => (
                  <li key={index}>{credential}</li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-gray-50">
              <h4 className="text-lg font-semibold mb-3">Areas of Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
