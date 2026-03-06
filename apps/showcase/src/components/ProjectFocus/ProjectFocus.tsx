import { Container } from '@intlayer/design-system';
import { useParams } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';
import { ArrowLeft } from 'lucide-react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '@/components/Link';
import type { Project } from '@/server/projectActions/types';
import { MoreProjects } from './MoreProjects';
import { ProjectScanDetails } from './ProjectScanDetails';
import { ProjectSidebar } from './ProjectSidebar';

interface ProjectFocusProps {
  project: Project | null;
}

export const ProjectFocus = ({ project }: ProjectFocusProps) => {
  const content = useIntlayer('project-focus');
  const { locale } = useParams({ from: '/{-$locale}' });

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return content.na.value;
    try {
      return new Date(dateStr).toLocaleDateString(locale || defaultLocale, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (_e) {
      return content.na.value;
    }
  };

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl space-y-4 px-6 py-20 text-center">
        <h1 className="font-bold text-3xl text-text">
          {content.projectNotFound.title}
        </h1>
        <p className="text-neutral">{content.projectNotFound.description}</p>
        <Link to="/" params={{ locale: locale || defaultLocale }}>
          {content.projectNotFound.backToGallery}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Back Link */}
      <Link
        to="/"
        params={{ locale: locale || defaultLocale }}
        className="group mb-6 inline-flex items-center gap-2 text-neutral text-sm transition-colors hover:text-text"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {content.backToShowcase}
      </Link>

      {/* Main Layout Grid */}
      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Image and Description */}
        <Container
          className="group relative aspect-video overflow-hidden bg-card shadow-lg lg:col-span-7"
          roundedSize="3xl"
          transparency="lg"
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            className="size-full object-cover"
          />
        </Container>
        {/* Right Column: Sidebar Info */}
        <div className="lg:col-span-5">
          <ProjectSidebar project={project} formatDate={formatDate} />
        </div>
      </div>

      {/* Bottom Sections: More Projects & Scan Details */}
      <div className="grid grid-cols-1 gap-12 border-neutral/10 border-t pt-12 lg:grid-cols-12">
        {/* Left Column: More Projects */}
        <div className="lg:col-span-5">
          <MoreProjects excludeId={project._id} />
        </div>

        {/* Right Column: Scan Details (SEO) */}
        <div className="lg:col-span-7">
          <ProjectScanDetails project={project} />
        </div>
      </div>
    </div>
  );
};
