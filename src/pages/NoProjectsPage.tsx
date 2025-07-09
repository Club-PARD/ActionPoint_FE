'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header';
import ParticipationProjectButton from '@/components/ParticipationProjectButton';
import ProjectCreateButton from '@/components/ProjectCreateButton';
import AddProject from '@/components/ProjectListPage/AddProject';

export default function NoProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>참여 중인 프로젝트가 없습니다.</h1>
        <p>새 프로젝트를 생성하거나 초대를 받아보세요.</p>
        <ParticipationProjectButton />
        <ProjectCreateButton onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <AddProject
          onClose={() => setIsModalOpen(false)}
          onProjectCreated={() => window.location.reload()} // 리스트 없으니 전체 새로고침
        />
      )}
    </>
  );
}
