import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MessageSquare, X, Calendar } from "lucide-react";
import { BookingDialog } from "./BookingDialog";

interface FloatingContactFormProps {
  onSubmit?: (data: FormData) => void;
  isOpen?: boolean;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const COOKIE_NAME = "contact_form_hidden";

const FloatingContactForm = ({
  onSubmit,
  isOpen = true,
}: FloatingContactFormProps) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const [showBooking, setShowBooking] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const isHidden = document.cookie
      .split("; ")
      .find((row) => row.startsWith(COOKIE_NAME));
    if (isHidden) {
      setIsExpanded(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHide = () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // Cookie expires in 7 days
    document.cookie = `${COOKIE_NAME}=true; expires=${expiryDate.toUTCString()}; path=/`;
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4 bg-blue-600 hover:bg-blue-700 text-white z-50"
        onClick={() => setIsExpanded(true)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <>
      <Card className="fixed bottom-4 right-4 md:w-[400px] w-[300px] p-6 bg-white shadow-lg rounded-lg z-50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Contact Me</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleHide}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <Input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <Textarea
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full min-h-[100px]"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Send Message
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">or</div>

          <div className="text-center">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowBooking(true)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule a Session
            </Button>
          </div>
        </form>
      </Card>

      <BookingDialog open={showBooking} onOpenChange={setShowBooking} />
    </>
  );
};

export default FloatingContactForm;
