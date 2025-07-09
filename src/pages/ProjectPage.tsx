import { useRouter } from 'next/router';

export default function ProjectPageContent() {
  const router = useRouter();
  const { projectId } = router.query;

  if (!projectId || Array.isArray(projectId)) return <div>잘못된 접근입니다.</div>;

  // const numericProjectId = Number(projectId);

}