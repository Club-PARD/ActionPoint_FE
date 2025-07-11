'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/MeetingSettingPannel.module.css';
import LeaveMeetingModal from './LeaveMeetingModal';

interface Props {
  meetingId: number;
  userId: number;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}


export default function MeetingSettingPannel({meetingId, userId, onEdit, onDelete, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // ✅ 모달 열기 상태

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose(); // 메뉴 닫기
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <>
      <div ref={panelRef} className={styles.menu}>
        <button className={styles.menuItem} onClick={onEdit}>
          <Image src="/edit.svg" alt="수정" width={18.5} height={18.5} />
          <span className={styles.edit}>수정하기</span>
        </button>
        <hr className={styles.divider} />
        <button
          className={styles.menuItem}
          onClick={() => {
            setShowDeleteModal(true); // ✅ 모달 열기
          }}
        >
          <Image src="/delete.svg" alt="삭제" width={18.5} height={18.5} />
          <span className={styles.edit}>삭제하기</span>
        </button>
      </div>

        {showDeleteModal && (
          <LeaveMeetingModal
            meetingId={meetingId}
            onCancel={() => setShowDeleteModal(false)}
            onConfirmSuccess={() => {
              setShowDeleteModal(false);
              onDelete(); // 목록 갱신
            }}
          />
        )}
    </>
  );
}
