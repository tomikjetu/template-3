import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  format,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isBefore,
  isToday,
} from "date-fns";
import { cn } from "@/lib/utils";

type SlotStatus = "available" | "booked" | "pending" | "unavailable";

interface TimeSlot {
  time: string;
  status: SlotStatus;
}

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const availableSlots: TimeSlot[] = [
  { time: "09:00", status: "available" },
  { time: "10:00", status: "available" },
  { time: "11:00", status: "available" },
  { time: "12:00", status: "available" },
  { time: "13:00", status: "available" },
  { time: "14:00", status: "available" },
  { time: "15:00", status: "available" },
  { time: "16:00", status: "available" },
  { time: "17:00", status: "available" },
];

const generateBookedAndUnavailableSlots = () => {
  const daysToGenerate = 14; // Number of days to generate from today

  const statuses = ["booked", "pending", "unavailable", "available"];
  const weights = [0.4, 0.1, 0.1, 0.4]; // Weights for each status

  const getRandomStatus = () => {
    const randomValue = Math.random();
    let cumulativeWeight = 0;
    for (let i = 0; i < weights.length; i++) {
      cumulativeWeight += weights[i];
      if (randomValue < cumulativeWeight) {
        return statuses[i];
      }
    }
    return statuses[statuses.length - 1]; // Fallback in case of rounding errors
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const result = {};
  const today = new Date();

  for (let i = 0; i < daysToGenerate; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const formattedDate = formatDate(date);

    result[formattedDate] = availableSlots.map((slot) => ({
      time: slot.time,
      status: getRandomStatus(),
    }));
  }

  return result;
};

const bookedAndUnavailableSlots = generateBookedAndUnavailableSlots();

// const bookedAndUnavailableSlots: { [key: string]: TimeSlot[] } = {
//   // Format: 'YYYY-MM-DD'
//   "2024-12-26": [
//     { time: "09:00", status: "booked" },
//     { time: "10:00", status: "pending" },
//     { time: "14:00", status: "unavailable" },
//   ],
//   "2024-12-27": [
//     { time: "11:00", status: "booked" },
//     { time: "15:00", status: "pending" },
//   ],
// };

interface TimeSlotButtonProps {
  slot: TimeSlot;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}

const TimeSlotButton: React.FC<TimeSlotButtonProps> = ({
  slot,
  isSelected,
  onClick,
  disabled,
}) => {
  const getSlotStyles = () => {
    const baseStyles = "w-full text-xs transition-colors";

    if (disabled) return `${baseStyles} opacity-50 cursor-not-allowed`;

    switch (slot.status) {
      case "booked":
        return `${baseStyles} bg-gray-100 text-gray-400 hover:bg-gray-100 cursor-not-allowed`;
      case "pending":
        return `${baseStyles} bg-yellow-50 text-yellow-600 hover:bg-yellow-50 cursor-not-allowed`;
      case "unavailable":
        return `${baseStyles} bg-red-50 text-red-400 hover:bg-red-50 cursor-not-allowed`;
      case "available":
        return cn(
          baseStyles,
          "hover:bg-blue-50",
          isSelected && "bg-blue-100 border-blue-500 text-blue-700",
        );
      default:
        return baseStyles;
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={getSlotStyles()}
      onClick={onClick}
      disabled={slot.status !== "available" || disabled}
    >
      {slot.time}
    </Button>
  );
};

export function BookingDialog({ open, onOpenChange }: BookingDialogProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [selectedTime, setSelectedTime] = React.useState<string>();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const days = React.useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const getTimeSlots = React.useCallback((date: Date): TimeSlot[] => {
    const dateKey = format(date, "yyyy-MM-dd");
    console.log(dateKey);
    const daySlots = bookedAndUnavailableSlots[dateKey] || [];

    return availableSlots.map((defaultSlot) => {
      const overrideSlot = daySlots.find(
        (slot) => slot.time === defaultSlot.time,
      );
      return overrideSlot || defaultSlot;
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !name || !email) return;

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const bookingDate = new Date(selectedDate);
    bookingDate.setHours(hours, minutes);

    console.log("Booking submitted:", {
      date: bookingDate,
      name,
      email,
      message,
    });

    onOpenChange(false);
  };

  const nextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1),
    );
  };

  const prevMonth = () => {
    const prev = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
    );
    if (isBefore(prev, startOfMonth(new Date()))) return;
    setCurrentMonth(prev);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book a Session</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <Button type="button" variant="outline" onClick={prevMonth}>
              Previous Month
            </Button>
            <h3 className="text-lg font-semibold">
              {format(currentMonth, "MMMM yyyy")}
            </h3>
            <Button type="button" variant="outline" onClick={nextMonth}>
              Next Month
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-4">
            {days.map((day) => {
              const isPast = isBefore(day, new Date()) && !isToday(day);
              const daySlots = getTimeSlots(day);
              const hasAvailableSlots = daySlots.some(
                (slot) => slot.status === "available",
              );

              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    "border rounded-lg p-2",
                    isPast && "opacity-50 cursor-not-allowed",
                    isSameDay(day, selectedDate) && "border-blue-500",
                    !hasAvailableSlots &&
                      !isPast &&
                      "border-gray-300 bg-gray-50",
                  )}
                >
                  <div className="text-sm font-medium mb-2">
                    {format(day, "E, MMM d")}
                  </div>
                  <div className="space-y-1">
                    {daySlots.map((slot) => (
                      <TimeSlotButton
                        key={slot.time}
                        slot={slot}
                        isSelected={
                          isSameDay(day, selectedDate) &&
                          slot.time === selectedTime
                        }
                        onClick={() => {
                          setSelectedDate(day);
                          setSelectedTime(slot.time);
                        }}
                        disabled={isPast}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Textarea
            placeholder="Additional message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px]"
          />

          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded-sm" />
                <span>Booked</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-50 border border-yellow-300 rounded-sm" />
                <span>Pending</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-50 border border-red-300 rounded-sm" />
                <span>Unavailable</span>
              </div>
            </div>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!selectedDate || !selectedTime || !name || !email}
            >
              Book Session
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
