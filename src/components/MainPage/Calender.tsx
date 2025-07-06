import styles from "../../styles/Calendar.module.css";

export default function Calendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0~11
  const today = now.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const firstDay = new Date(year, month, 1).getDay(); // 0: Sunday ~ 6: Saturday

  return (
    <div className={styles.calendarArea}>
      <div className={styles.calendarHeader}>
        <span>{monthNames[month]} {year}</span>
        <div>
          <button>&lt;</button>
          <button>&gt;</button>
        </div>
      </div>

      <div className={styles.weekDays}>
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
      </div>

      <div className={styles.daysGrid}>
        {/* 시작 요일만큼 빈칸 */}
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`}></div>
        ))}
        
        {/* 날짜 출력 */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          return (
            <div
              key={day}
              className={`${styles.day} ${day === today ? styles.today : ""}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
