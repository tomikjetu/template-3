import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  role: string;
}

interface TestimonialsCarouselProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    rating: 5,
    text: "The tutoring sessions have been transformative for my learning experience. Highly recommended!",
    role: "Math Student",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    rating: 5,
    text: "Exceptional teaching methods and very patient approach. Saw improvement in my grades within weeks.",
    role: "Science Student",
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    rating: 5,
    text: "The personalized attention and structured learning plan made all the difference in my studies.",
    role: "English Student",
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    rating: 5,
    text: "Outstanding support and guidance. Really helped me build confidence in my abilities.",
    role: "Physics Student",
  },
];

const TestimonialsCarousel = ({
  testimonials = defaultTestimonials,
}: TestimonialsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [slidesToShow, setSlidesToShow] = React.useState(3);

  React.useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(
        window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3,
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + slidesToShow;
      return nextIndex >= testimonials.length ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0
        ? Math.max(0, testimonials.length - slidesToShow)
        : prevIndex - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index * slidesToShow);
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + slidesToShow,
  );
  const totalSlides = Math.ceil((testimonials.length - slidesToShow + 1) / 1);

  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 px-12">
          What Our Students Say
        </h2>

        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-all duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%) translateX(48px)`,
              width: `${(testimonials.length * 100) / slidesToShow}%`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <Card className="mx-3 p-6 shadow-lg h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-700">{testimonial.text}</p>
                </Card>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 -translate-x-6 bg-white shadow-lg z-20 left-8"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 translate-x-6 bg-white shadow-lg z-20 right-8"
            onClick={nextSlide}
            disabled={currentIndex >= testimonials.length - slidesToShow}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {Array(totalSlides)
            .fill(0)
            .map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${currentIndex === index * slidesToShow ? "bg-blue-600 w-4" : "bg-gray-300"}`}
                onClick={() => goToSlide(index)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
