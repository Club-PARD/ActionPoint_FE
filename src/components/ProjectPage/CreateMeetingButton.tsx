// 파일: components/MeetingRecordSection/CreateMeetingButton.tsx
'use client';

import Link from 'next/link';
import styles from '../../styles/CreateMeetingButton.module.css';

export default function CreateMeetingButton() {
  return (
    <Link href="/MeetingPage" passHref>
      <button className={styles.createBtn}>
        + 새로운 회의록 작성하기
      </button>
    </Link>
  );
}
