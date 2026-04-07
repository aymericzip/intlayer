import { createFileRoute } from '@tanstack/react-router';
import { ProjectsAdminPageContent } from '#components/Dashboard/AdminPage/AdminProjects/ProjectsAdminPage';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/projects'
)({
  component: ProjectsAdminPage,
});

function ProjectsAdminPage() {
  return <ProjectsAdminPageContent />;
}
