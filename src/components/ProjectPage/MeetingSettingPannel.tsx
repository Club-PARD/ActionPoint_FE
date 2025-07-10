'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../../styles/MeetingSettingPannel.module.css';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void; // ⬅️ 외부 클릭 시 닫는 콜백
}

export default function MeetingSettingPannel({ onEdit, onDelete, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose(); // 바깥 클릭 시 닫기
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={panelRef} className={styles.menu}>
      <button className={styles.menuItem} onClick={onEdit}>
        <Image src="/edit.svg" alt="수정" width={18.5} height={18.5} />
        <span className={styles.edit}>수정하기</span>
      </button>
      <hr className={styles.divider} />
      <button className={styles.menuItem} onClick={onDelete}>
        <Image src="/delete.svg" alt="삭제" width={18.5} height={18.5} />
        <span className={styles.edit}>삭제하기</span>
      </button>
    </div>
  );
}
