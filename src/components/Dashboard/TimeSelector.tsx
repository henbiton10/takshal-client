import { useState, useMemo } from 'react';
import styled from 'styled-components';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TimeRange } from './types';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 80px 0 0 24px;
  z-index: 1000;
`;

const SelectorContainer = styled.div`
  background: #0f1d32;
  border: 1px solid rgba(174, 199, 255, 0.15);
  border-radius: 12px;
  padding: 16px;
  min-width: 280px;
  direction: rtl;
`;

const Title = styled.h3`
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: white;
`;

const CalendarContainer = styled.div`
  margin-bottom: 16px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const MonthYear = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: white;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: white;
  }
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 4px;
`;

const WeekDay = styled.div`
  text-align: center;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  padding: 4px;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const DayCell = styled.button<{ 
  $isToday?: boolean; 
  $isSelected?: boolean; 
  $isInRange?: boolean;
  $isEmpty?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  border: none;
  border-radius: 50%;
  font-size: 12px;
  cursor: ${props => props.$isEmpty ? 'default' : 'pointer'};
  transition: all 0.2s;

  background: ${props => {
    if (props.$isEmpty) return 'transparent';
    if (props.$isSelected) return '#22c55e';
    if (props.$isInRange) return 'rgba(34, 197, 94, 0.2)';
    if (props.$isToday) return 'rgba(59, 130, 246, 0.3)';
    return 'transparent';
  }};

  color: ${props => {
    if (props.$isEmpty) return 'transparent';
    if (props.$isSelected) return 'white';
    if (props.$isToday) return '#3b82f6';
    return 'rgba(255, 255, 255, 0.8)';
  }};

  &:hover {
    background: ${props => {
      if (props.$isEmpty) return 'transparent';
      if (props.$isSelected) return '#16a34a';
      return 'rgba(255, 255, 255, 0.1)';
    }};
  }
`;

const TimeInputsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const TimeInputGroup = styled.div`
  flex: 1;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 6px;
`;

const TimeInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  background: rgba(20, 35, 65, 0.5);
  border: 1px solid rgba(174, 199, 255, 0.15);
  border-radius: 6px;
  color: white;
  font-size: 13px;
  text-align: center;
  direction: ltr;

  &:focus {
    outline: none;
    border-color: rgba(174, 199, 255, 0.3);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #22c55e;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #16a34a;
  }

  &:disabled {
    background: #4b5563;
    cursor: not-allowed;
  }
`;

interface Props {
  onSelect: (range: TimeRange) => void;
  onClose: () => void;
  currentRange: TimeRange | null;
}

export const TimeSelector = ({ onSelect, onClose, currentRange }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (currentRange?.startDate) {
      return new Date(currentRange.startDate.getFullYear(), currentRange.startDate.getMonth(), 1);
    }
    return new Date();
  });
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    currentRange?.startDate || null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    currentRange?.endDate || null
  );
  const [startTime, setStartTime] = useState(currentRange?.startTime || '10:45');
  const [endTime, setEndTime] = useState(currentRange?.endTime || '12:30');

  const weekDays = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];
    
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [currentMonth]);

  const formatMonthYear = () => {
    return currentMonth.toLocaleDateString('he-IL', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(null);
    } else {
      if (clickedDate < selectedStartDate) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(clickedDate);
      } else {
        setSelectedEndDate(clickedDate);
      }
    }
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number): boolean => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return (
      (selectedStartDate !== null && date.toDateString() === selectedStartDate.toDateString()) ||
      (selectedEndDate !== null && date.toDateString() === selectedEndDate.toDateString())
    );
  };

  const isInRange = (day: number) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date > selectedStartDate && date < selectedEndDate;
  };

  const handleSubmit = () => {
    if (selectedStartDate) {
      onSelect({
        startDate: selectedStartDate,
        endDate: selectedEndDate || selectedStartDate,
        startTime,
        endTime,
      });
    }
  };

  return (
    <Overlay onClick={onClose}>
      <SelectorContainer onClick={e => e.stopPropagation()}>
        <Title>בחירת זמן</Title>

        <CalendarContainer>
          <CalendarHeader>
            <NavButton onClick={handleNextMonth}>
              <ChevronRightIcon sx={{ fontSize: 18 }} />
            </NavButton>
            <MonthYear>{formatMonthYear()}</MonthYear>
            <NavButton onClick={handlePrevMonth}>
              <ChevronLeftIcon sx={{ fontSize: 18 }} />
            </NavButton>
          </CalendarHeader>

          <WeekDays>
            {weekDays.map(day => (
              <WeekDay key={day}>{day}</WeekDay>
            ))}
          </WeekDays>

          <DaysGrid>
            {calendarDays.map((day, idx) => (
              <DayCell
                key={idx}
                $isEmpty={day === null}
                $isToday={day !== null ? isToday(day) : false}
                $isSelected={day !== null ? isSelected(day) : false}
                $isInRange={day !== null ? isInRange(day) : false}
                onClick={() => day !== null && handleDayClick(day)}
                disabled={day === null}
              >
                {day}
              </DayCell>
            ))}
          </DaysGrid>
        </CalendarContainer>

        <TimeInputsContainer>
          <TimeInputGroup>
            <InputLabel>שעת התחלה</InputLabel>
            <TimeInput
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </TimeInputGroup>
          <TimeInputGroup>
            <InputLabel>שעת סיום</InputLabel>
            <TimeInput
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
            />
          </TimeInputGroup>
        </TimeInputsContainer>

        <SubmitButton 
          onClick={handleSubmit}
          disabled={!selectedStartDate}
        >
          קפיצה לזמן הנבחר
        </SubmitButton>
      </SelectorContainer>
    </Overlay>
  );
};
