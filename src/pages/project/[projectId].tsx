// pages/project/[projectId].tsx
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ProjectPage = dynamic(() => import('@/components/ProjectPage/ProjectPageContent'), { ssr: false });

export default function ProjectDetailWrapper() {
  const router = useRouter();
  const { projectId } = router.query;

  if (!projectId || Array.isArray(projectId)) return null;

  return <ProjectPage projectId={Number(projectId)} />;
}
