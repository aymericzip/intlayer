import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { H2 } from '@intlayer/design-system/headers';
import { useAuth } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { Modal, ModalSize } from '@intlayer/design-system/modal';
import { Showcase_Root_Path } from '@intlayer/design-system/routes';
import {
  Badge,
  Calendar,
  Check,
  Circle,
  Layers,
  Pencil,
  RefreshCw,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  X,
  Zap,
} from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#/hooks/useLocalizedNavigate';
import { useShowcaseLike } from '#/hooks/useShowcaseLike';
import type { ShowcaseProject } from '#/utils/projectActions/types';
import { EditProjectModal } from './EditProjectModal';
import { useScanProject } from './useScanProject';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? '';

interface ProjectSidebarProps {
  project: ShowcaseProject;
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
        <Circle className="size-5 shrink-0 text-neutral/30" />
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
  const submitFormContent = useIntlayer('submit-project-form');
  const appContent = useIntlayer('showcase-index');
  const { oAuth2AccessToken } = useAuth();
  const navigate = useLocalizedNavigate();
  const {
    scanStep,
    scanError,
    scannedProject,
    scanProject,
    cancelScan,
    resetScan,
  } = useScanProject();

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedProject, setEditedProject] = useState<ShowcaseProject | null>(
    null
  );

  // Use scanned result if available, then edited, otherwise fall back to initial data
  const project = scannedProject ?? editedProject ?? initialProject;

  const {
    score,
    isUpvoted,
    isDownVoted,
    isPending: isVoteDisabled,
    handleUpvote,
    handleDownvote,
  } = useShowcaseLike(project);

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const headers: Record<string, string> = {};
      const token =
        (oAuth2AccessToken as any)?.accessToken ?? oAuth2AccessToken;
      if (token && typeof token === 'string') {
        headers.Authorization = `Bearer ${token}`;
      }
      const res = await fetch(
        `${BACKEND_URL}/api/showcase-project/${initialProject.id}`,
        { method: 'DELETE', headers, credentials: 'include' }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setDeleteError(body?.error?.message ?? 'Failed to delete project');
        return;
      }
      navigate(Showcase_Root_Path);
    } catch (e) {
      setDeleteError((e as Error).message ?? 'Failed to delete project');
    } finally {
      setIsDeleting(false);
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
                <H2>{submitFormContent.modal.errorTitle}</H2>
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
                  label={submitFormContent.modal.closeButton.value}
                >
                  {submitFormContent.modal.closeButton}
                </Button>
              </>
            ) : scanStep === 'SUCCESS' ? (
              <>
                <H2>{submitFormContent.modal.successTitle}</H2>
                <span className="text-center text-neutral text-sm">
                  {submitFormContent.modal.successMessage}
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
                  label={submitFormContent.modal.closeButton.value}
                >
                  {submitFormContent.modal.closeButton}
                </Button>
              </>
            ) : (
              <>
                <H2>{submitFormContent.modal.title}</H2>

                <Loader isLoading={true} />

                <div className="my-4 flex w-full max-w-md flex-col gap-4 border-l border-l-neutral/30 pl-4">
                  <ul className="space-y-3 text-neutral text-sm">
                    <ScanStepItem
                      label={submitFormContent.modal.steps.verifyBundle.value}
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
                        label={submitFormContent.modal.steps.verifyGithub.value}
                        isCurrent={scanStep === 'VERIFY_GITHUB_START'}
                        isDone={[
                          'VERIFY_GITHUB_SUCCESS',
                          'SCREENSHOT_START',
                          'SCREENSHOT_SUCCESS',
                        ].includes(scanStep as string)}
                      />
                    )}
                    <ScanStepItem
                      label={
                        submitFormContent.modal.steps.screenshotAndSave.value
                      }
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
        <div className="flex items-start gap-4">
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
      </Container>

      {/* Owner-only actions */}
      {initialProject.isOwner && (
        <Container
          className="flex flex-col"
          roundedSize="3xl"
          padding="md"
          gap="md"
          transparency="lg"
        >
          <Button
            type="button"
            variant="hoverable"
            color="text"
            label="Scan project"
            Icon={RefreshCw}
            isLoading={isScanRunning}
            disabled={isScanRunning}
            onClick={() => scanProject(project.id)}
            className="mt-2 w-full"
          >
            {isScanRunning ? 'Scanning…' : 'Scan Project'}
          </Button>
          <Button
            type="button"
            variant="hoverable"
            color="text"
            label="Edit project"
            Icon={Pencil}
            disabled={isScanRunning}
            onClick={() => setEditModalOpen(true)}
            className="w-full"
          >
            Edit Project
          </Button>
          <Button
            type="button"
            variant="outline"
            color="error"
            label={content.deleteProject.value}
            Icon={Trash2}
            disabled={isScanRunning}
            onClick={() => setDeleteConfirmOpen(true)}
            className="w-full"
          >
            {content.deleteProject}
          </Button>

          {/* Edit modal */}
          {editModalOpen && (
            <EditProjectModal
              project={project}
              onClose={() => setEditModalOpen(false)}
              onUpdated={(updated) => {
                // The API returns `id` (not `_id`), so normalise before storing.
                setEditedProject({
                  ...updated,
                  id: updated.id,
                });
                setEditModalOpen(false);
              }}
            />
          )}

          {/* Delete confirmation modal */}
          <Modal
            isOpen={deleteConfirmOpen}
            onClose={() => setDeleteConfirmOpen(false)}
            size={ModalSize.SM}
            hasCloseButton
            title={content.deleteConfirmTitle}
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              <p className="text-neutral text-sm">
                {content.deleteConfirmDescription}
              </p>
              {deleteError && (
                <p className="text-error text-sm">{deleteError}</p>
              )}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="hoverable"
                  color="neutral"
                  label={content.deleteCancel.value}
                  onClick={() => setDeleteConfirmOpen(false)}
                  className="flex-1"
                >
                  {content.deleteCancel}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  color="error"
                  label={content.deleteConfirm.value}
                  Icon={Trash2}
                  isLoading={isDeleting}
                  disabled={isDeleting}
                  onClick={handleDelete}
                  className="flex-1"
                >
                  {content.deleteConfirm}
                </Button>
              </div>
            </div>
          </Modal>
        </Container>
      )}

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
            {score}
          </Container>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="hoverable"
            color="text"
            label={appContent.showcase.upvote.label.value}
            Icon={ThumbsUp}
            className="flex-1"
            onClick={handleUpvote}
            disabled={isVoteDisabled}
            isActive={isUpvoted}
          />
          <Button
            type="button"
            variant="hoverable"
            color="text"
            label={appContent.showcase.downvote.label.value}
            Icon={ThumbsDown}
            className="flex-1"
            onClick={handleDownvote}
            disabled={isVoteDisabled}
            isActive={isDownVoted}
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
