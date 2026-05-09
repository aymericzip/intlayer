import { createFileRoute } from '@tanstack/react-router';
import { ProjectAdminDetailPage } from '#components/Dashboard/AdminPage/AdminProjects/ProjectAdminDetailPage';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/projects/$id'
)({
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { id } = Route.useParams();
  return <ProjectAdminDetailPage projectId={id} />;
}
