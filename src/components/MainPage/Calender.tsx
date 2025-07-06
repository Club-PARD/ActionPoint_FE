import styles from "../../styles/Calendar.module.css";
import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const today = new Date();

  const handlePrev = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weeks = [];
  let dayCount = 1 - firstDay;

  while (dayCount <= lastDate || new Date(year, month, dayCount).getDay() !== 0) {
    const days = [];
    for (let j = 0; j < 7; j++) {
      const date = new Date(year, month, dayCount);
      const isCurrentMonth = date.getMonth() === month;
      const isToday =
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();

      days.push(
        <div key={j} className={styles.cell}>
          <div
            className={`${styles.date} ${
              isToday ? styles.today : ""
            } ${!isCurrentMonth ? styles.otherMonth : ""}`}
          >
            {date.getDate()}
          </div>
        </div>
      );
      dayCount++;
    }
    weeks.push(
      <div key={dayCount} className={styles.week}>
        {days}
      </div>
    );
  }

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendar}>
        <div className={styles.header}>
          <div className={styles.monthText}>
            {monthNames[month]} {year}
          </div>
          <div className={styles.navButtons}>
            <button onClick={handlePrev}>&lt;</button>
            <button onClick={handleNext}>&gt;</button>
          </div>
        </div>
        <div className={styles.days}>
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        {weeks}
      </div>
    </div>
  );
};

export default Calendar;
