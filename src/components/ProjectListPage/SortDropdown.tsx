'use client';

import { useState } from 'react';
import styles from '../../styles/SortDropdown.module.css';

const options = ['최신순', '진행중인 프로젝트', '준비중인 프로젝트', '종료된 프로젝트'];

interface SortDropdownProps {
  onSelect?: (option: string) => void;
  defaultOption?: string;
}

export default function SortDropdown({ onSelect, defaultOption = '최신순' }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultOption);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option); // ✅ 부모에게 선택 값 전달
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.toggle}>
        {selected}
        <span className={styles.arrow}></span>
      </button>
      {isOpen && (
        <ul className={styles.menu}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className={`${styles.item} ${selected === option ? styles.selected : ''}`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
