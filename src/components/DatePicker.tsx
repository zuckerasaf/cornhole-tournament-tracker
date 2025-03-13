
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface DatePickerProps {
  date: Date;
  setDate: (date: Date | undefined) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  const [timeValue, setTimeValue] = React.useState("12:00");
  
  React.useEffect(() => {
    // Initialize time value from the passed date
    if (date) {
      setTimeValue(
        format(date, "HH:mm")
      );
    }
  }, []);
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeValue(e.target.value);
    
    // Update the date with the new time value
    if (date) {
      const [hours, minutes] = e.target.value.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      setDate(newDate);
    }
  };
  
  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      const [hours, minutes] = timeValue.split(":").map(Number);
      newDate.setHours(hours || 0);
      newDate.setMinutes(minutes || 0);
      setDate(newDate);
    } else {
      setDate(undefined);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
        
        <Input
          type="time"
          value={timeValue}
          onChange={handleTimeChange}
          className="bg-white/50 dark:bg-black/50"
        />
      </div>
    </div>
  );
}
