import {
  Button,
  Container,
  H2,
  Link,
  Loader,
  Modal,
  ModalSize,
} from '@intlayer/design-system';
import {
  useSession,
  useToggleShowcaseLike,
} from '@intlayer/design-system/hooks';
import {
  Badge,
  Calendar,
  Check,
  Code,
  Layers,
  RefreshCw,
  ThumbsDown,
  ThumbsUp,
  X,
  Zap,
} from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { AppRoutes } from '#/Routes';
import type { Project } from '@/server/projectActions/types';
import { useScanProject } from './useScanProject';

interface ProjectSidebarProps {
  project: Project;
  formatDate: (dateStr?: string) => string;
}

const ScanStepItem: FC<{
  label: string;
  isCurrent: boolean;
  isDone: boolean;
}> = ({ label, isCurrent, isDone }) => (
  <li className="flex items-center gap-2">
    <span className="flex size-6 items-center justify-center">
      {isDone ? (
        <Check className="h-4 w-4 text-success" />
      ) : isCurrent ? (
        <Loader className="h-4 w-4" />
      ) : (
        <span className="animate-pulse">⏳</span>
      )}
    </span>
    <span
      className={!isDone && !isCurrent ? 'animate-pulse text-neutral/50' : ''}
    >
      {label}
    </span>
  </li>
);

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: ReactNode;
  value: ReactNode;
}) => (
  <div className="flex items-center gap-3">
    <Container roundedSize="xl" padding="sm" transparency="lg">
      {icon}
    </Container>
    <div className="flex flex-col">
      <span className="mb-1 font-bold text-[10px] text-neutral uppercase leading-none tracking-widest">
        {label}
      </span>
      <span className="font-semibold text-sm text-text">{value}</span>
    </div>
  </div>
);

export const ProjectSidebar: FC<ProjectSidebarProps> = ({
  project: initialProject,
  formatDate,
}) => {
  const content = useIntlayer('project-sidebar');
  const appContent = useIntlayer('app');
  const { session } = useSession();
  const { mutateAsync: toggleLike, isPending } = useToggleShowcaseLike();
  const {
    scanStep,
    scanError,
    scannedProject,
    scanProject,
    cancelScan,
    resetScan,
  } = useScanProject();

  // Use scanned result if available, otherwise fall back to initial data
  const project = scannedProject ?? initialProject;

  const [upvotes, setUpvotes] = useState(project.upvotes);
  const [isLiked, setIsLiked] = useState(project.upvoters.length > 0);

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      const redirectUrl = encodeURIComponent(window.location.href);
      window.location.href = `${AppRoutes.Auth_SignIn}?redirect_url=${redirectUrl}`;
      return;
    }
    try {
      const result = await toggleLike(project._id);
      if (result?.data) {
        setUpvotes(result.data.upvotes);
        setIsLiked(result.data.isLiked);
      }
    } catch {
      // ignore
    }
  };

  const isScanRunning =
    scanStep !== null && scanStep !== 'SUCCESS' && scanStep !== 'ERROR';

  const packageEntries = Object.entries(project.packageDetails ?? {});

  return (
    <div className="space-y-6">
      {/* Scan Progress Modal */}
      {scanStep !== null && (
        <Modal
          isOpen={true}
          onClose={isScanRunning ? cancelScan : resetScan}
          size={ModalSize.MD}
          hasCloseButton
        >
          <div className="flex flex-col items-center justify-center gap-5 px-4 py-6">
            {scanError ? (
              <>
                <H2>Scan Failed</H2>
                <span className="max-w-full overflow-hidden text-clip text-center text-neutral text-sm">
                  {scanError}
                </span>
                <div className="m-auto mt-4 aspect-square rounded-full bg-error/30 p-5">
                  <X className="text-error" size={50} />
                </div>
                <Button
                  color="text"
                  Icon={X}
                  onClick={resetScan}
                  isFullWidth
                  className="mt-6"
                  label="Close"
                >
                  Close
                </Button>
              </>
            ) : scanStep === 'SUCCESS' ? (
              <>
                <H2>Scan Complete!</H2>
                <span className="text-center text-neutral text-sm">
                  Your project has been successfully scanned and updated.
                </span>
                <div className="m-auto mt-4 aspect-square rounded-full bg-success/30 p-5">
                  <Check className="text-success" size={50} />
                </div>
                <Button
                  color="text"
                  Icon={Check}
                  onClick={resetScan}
                  isFullWidth
                  className="mt-6"
                  label="Done"
                >
                  Done
                </Button>
              </>
            ) : (
              <>
                <H2>Scanning Project</H2>
                <Loader isLoading={true} />
                <div className="my-4 flex w-full max-w-md flex-col gap-4 border-l border-l-neutral/30 pl-4">
                  <ul className="space-y-3 text-neutral text-sm">
                    <ScanStepItem
                      label="Scanning website for Intlayer usage..."
                      isCurrent={scanStep === 'SCANNING_START'}
                      isDone={[
                        'SCANNING_SUCCESS',
                        'VERIFY_GITHUB_START',
                        'VERIFY_GITHUB_SUCCESS',
                        'SCREENSHOT_START',
                        'SCREENSHOT_SUCCESS',
                      ].includes(scanStep as string)}
                    />
                    {initialProject.githubUrl && (
                      <ScanStepItem
                        label="Verifying GitHub repository..."
                        isCurrent={scanStep === 'VERIFY_GITHUB_START'}
                        isDone={[
                          'VERIFY_GITHUB_SUCCESS',
                          'SCREENSHOT_START',
                          'SCREENSHOT_SUCCESS',
                        ].includes(scanStep as string)}
                      />
                    )}
                    <ScanStepItem
                      label="Taking screenshot & saving..."
                      isCurrent={scanStep === 'SCREENSHOT_START'}
                      isDone={scanStep === 'SCREENSHOT_SUCCESS'}
                    />
                  </ul>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}

      <Container padding="xl" roundedSize="3xl" transparency="lg">
        <div className="flex items-center gap-4">
          {project.logoUrl && (
            <Container
              roundedSize="3xl"
              transparency="lg"
              className="shrink-0 overflow-hidden shadow-md"
            >
              <img
                src={project.logoUrl}
                alt=""
                className="size-8 bg-text/10 object-cover"
              />
            </Container>
          )}
          <h1 className="font-bold text-2xl text-text md:text-3xl">
            {project.title}
          </h1>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {(project.tags ?? []).map((tag) => (
            <Badge
              key={tag}
              color="neutral"
              className="py-0.5 font-semibold text-[10px]"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <p className="whitespace-pre-wrap text-base text-neutral/90 leading-relaxed">
          {project.description}
        </p>
      </Container>
      <div className="flex items-center gap-3">
        {project.githubUrl && (
          <Container
            roundedSize="2xl"
            transparency="lg"
            className="group h-full flex-1 shadow-sm transition-all"
          >
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="button"
              label={content.githubRepo.value}
            >
              <Code className="size-4 text-text" />
              <span className="font-medium text-sm">{content.githubRepo}</span>
            </Link>
          </Container>
        )}
        <Link
          href={project.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          color="text"
          variant="button"
          label={content.visitWebsite.value}
          isExternalLink
          className="flex-2 py-3 text-sm"
        >
          {content.visitWebsite}
        </Link>
      </div>

      <Container
        className="flex flex-col"
        roundedSize="3xl"
        padding="lg"
        gap="md"
        transparency="lg"
      >
        <InfoItem
          icon={<Calendar className="size-4" />}
          label={content.published}
          value={formatDate(project.createdAt)}
        />
        <InfoItem
          icon={<Zap className="size-4" />}
          label={content.lastScan}
          value={formatDate(project.lastScanDate)}
        />
        <InfoItem
          icon={<Layers className="size-4" />}
          label={content.intlayerVersion}
          value={project.intlayerVersion || content.stable}
        />

        {/* Scan button — only visible to the project owner */}
        {initialProject.isOwner && (
          <Button
            type="button"
            variant="hoverable"
            color="text"
            label="Scan project"
            Icon={RefreshCw}
            isLoading={isScanRunning}
            disabled={isScanRunning}
            onClick={() => scanProject(project._id)}
            className="mt-2 w-full"
          >
            {isScanRunning ? 'Scanning…' : 'Scan Project'}
          </Button>
        )}
      </Container>

      {/* Rating Section inside Sidebar */}
      <Container
        className="flex flex-col"
        roundedSize="3xl"
        padding="lg"
        gap="md"
        transparency="lg"
      >
        <div className="items-top flex justify-between">
          <span className="block font-bold text-neutral text-xs uppercase tracking-widest">
            {content.rateThisProject}
          </span>
          <Container className="flex aspect-square size-10 items-center justify-center rounded-full font-bold text-lg text-text/70">
            {upvotes}
          </Container>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="hoverable"
            color={isLiked ? 'primary' : 'neutral'}
            label={appContent.showcase.upvote.label.value}
            Icon={ThumbsUp}
            className="flex-1"
            onClick={handleVote}
            disabled={isPending}
          />
          <Button
            type="button"
            variant="hoverable"
            color="neutral"
            label={appContent.showcase.downvote.label.value}
            Icon={ThumbsDown}
            className="flex-1"
            onClick={handleVote}
            disabled={isPending}
          />
        </div>
      </Container>

      {/* Package Details Section */}
      {packageEntries.length > 0 && (
        <Container
          className="flex flex-col"
          roundedSize="3xl"
          padding="lg"
          gap="md"
          transparency="lg"
        >
          <span className="block font-bold text-neutral text-xs uppercase tracking-widest">
            {content.libsUsed}
          </span>
          <div className="flex flex-col gap-1.5">
            {packageEntries.map(([pkg, version]) => (
              <div
                key={pkg}
                className="flex items-center justify-between gap-2"
              >
                <span className="font-medium text-text text-xs">{pkg}</span>
                {version && (
                  <Container roundedSize="xl" transparency="lg" padding="sm">
                    <span className="font-mono text-neutral text-xs">
                      v{version}
                    </span>
                  </Container>
                )}
              </div>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
};
