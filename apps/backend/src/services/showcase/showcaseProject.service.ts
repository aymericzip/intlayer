import { ShowcaseProjectModel } from '@models/showcaseProject.model';
import { GenericError } from '@utils/errors';
import type {
  ShowcaseProjectData,
  ShowcaseProjectDocument,
} from '@/types/showcaseProject.types';

export const findShowcaseProjects = async (filters: {
  search?: string;
  selectedUseCases?: string[];
  isOpenSource?: boolean;
  page?: number;
  pageSize?: number;
}): Promise<{
  data: ShowcaseProjectDocument[];
  total_items: number;
  total_pages: number;
}> => {
  const {
    search,
    selectedUseCases,
    isOpenSource,
    page = 1,
    pageSize = 20,
  } = filters;

  const query: Record<string, unknown> = {};

  if (isOpenSource) {
    query.githubUrl = { $exists: true, $ne: null };
  }
  if (selectedUseCases && selectedUseCases.length > 0) {
    query.tags = { $in: selectedUseCases };
  }
  if (search?.trim()) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
    ];
  }

  const total_items = await ShowcaseProjectModel.countDocuments(query);
  const total_pages = Math.ceil(total_items / pageSize) || 1;

  const data = await ShowcaseProjectModel.find(query)
    .sort({ upvotes: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .lean();

  return {
    data: data as unknown as ShowcaseProjectDocument[],
    total_items,
    total_pages,
  };
};

export const findShowcaseProjectById = async (
  projectId: string
): Promise<ShowcaseProjectDocument> => {
  const project = await ShowcaseProjectModel.findById(projectId).lean();

  if (!project) {
    throw new GenericError('SHOWCASE_PROJECT_NOT_FOUND', { projectId });
  }

  return project as unknown as ShowcaseProjectDocument;
};

export const findShowcaseProjectByUrl = async (
  websiteUrl: string
): Promise<ShowcaseProjectDocument | null> => {
  const project = await ShowcaseProjectModel.findOne({ websiteUrl }).lean();
  return project as unknown as ShowcaseProjectDocument | null;
};

export const findOtherShowcaseProjects = async (
  excludeId: string,
  limit = 4
): Promise<ShowcaseProjectDocument[]> => {
  const projects = await ShowcaseProjectModel.find({
    _id: { $ne: excludeId },
  })
    .limit(limit)
    .lean();

  return projects as unknown as ShowcaseProjectDocument[];
};

export const createShowcaseProject = async (
  projectData: ShowcaseProjectData
): Promise<ShowcaseProjectDocument> => {
  const newProject = new ShowcaseProjectModel({
    ...projectData,
    upvotes: 0,
    upvoters: [],
  });

  await newProject.save();
  return newProject as unknown as ShowcaseProjectDocument;
};

export const toggleShowcaseLike = async (
  projectId: string,
  userId: string
): Promise<{ upvotes: number; isLiked: boolean }> => {
  const project = await ShowcaseProjectModel.findById(projectId);

  if (!project) {
    throw new GenericError('SHOWCASE_PROJECT_NOT_FOUND', { projectId });
  }

  const upvoters: string[] = project.upvoters || [];
  const isLiked = upvoters.includes(userId);

  if (isLiked) {
    project.upvoters = upvoters.filter((id) => id !== userId);
    project.upvotes = Math.max(0, (project.upvotes || 0) - 1);
  } else {
    project.upvoters.push(userId);
    project.upvotes = (project.upvotes || 0) + 1;
  }

  await project.save();

  return { upvotes: project.upvotes, isLiked: !isLiked };
};
