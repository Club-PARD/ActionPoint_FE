'use client';

import Image from 'next/image';
import styles from '../../styles/MeetingSettingPannel.module.css';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function MeetingSettingPannel({ onEdit, onDelete }: Props) {
  return (
    <div className={styles.menu}>
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
