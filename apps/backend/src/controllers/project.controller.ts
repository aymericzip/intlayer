import { logger } from '@logger';
import { SessionModel } from '@schemas/session.schema';
import * as ciService from '@services/ci.service';
import { createDemoDictionaries } from '@services/dictionary.service';
import { refreshProjectScreenshotIfChanged } from '@services/project/projectScreenshot.service';
import * as projectService from '@services/project.service';
import * as userService from '@services/user.service';
import * as webhooksService from '@services/webhook.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getProjectFiltersAndPagination,
  type ProjectFiltersParams,
} from '@utils/filtersAndPagination/getProjectFiltersAndPagination';
import { mapProjectsToAPI, mapProjectToAPI } from '@utils/mapper/project';
import { hasPermission } from '@utils/permissions';
import { getPlanDetails } from '@utils/plan';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import type { Types } from 'mongoose';
import type {
  ProjectAPI,
  ProjectConfiguration,
  ProjectCreationData,
  ProjectData,
} from '@/types/project.types';
import type { User } from '@/types/user.types';

export type GetProjectsParams = FiltersAndPagination<ProjectFiltersParams>;
export type GetProjectsResult = PaginatedResponse<ProjectAPI>;

/**
 * Retrieves a list of projects based on filters and pagination.
 */
export const getProjects = async (
  request: FastifyRequest<{ Querystring: GetProjectsParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, roles } = request.session || {};
  const { filters, sortOptions, pageSize, skip, page, getNumberOfPages } =
    getProjectFiltersAndPagination(request);

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  // When no organization is selected in the session,
  // the filter already scopes organizationId to undefined → DB returns []
  // so we can proceed safely without an early 403.

  try {
    const projects = await projectService.findProjects(
      filters,
      skip,
      pageSize,
      sortOptions
    );

    // Skip permission check when there are no projects to protect.
    // An empty result is safe to return without checking roles.
    if (
      projects.length > 0 &&
      !hasPermission(
        roles || [],
        'project:read'
      )({
        ...request.session,
        targetProjects: projects,
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    const totalItems = await projectService.countProjects(filters);

    const formattedProjects = mapProjectsToAPI(projects);

    const responseData = formatPaginatedResponse<ProjectAPI>({
      data: formattedProjects,
      page,
      pageSize,
      totalPages: getNumberOfPages(totalItems),
      totalItems,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type AddProjectBody = ProjectCreationData;
export type AddProjectResult = ResponseData<ProjectAPI>;

/**
 * Adds a new project to the database.
 */
export const addProject = async (
  request: FastifyRequest<{ Body: AddProjectBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { organization, user, roles } = request.session || {};
  const projectData = request.body;

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  if (!projectData) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_DATA_NOT_FOUND'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'organization:admin'
    )({
      ...request.session,
      targetOrganizations: [organization],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const { plan } = organization;

  const planType = getPlanDetails(plan);

  if (planType.numberOfProjects) {
    const projectCount = await projectService.countProjects({
      organizationId: organization.id,
    });

    if (projectCount >= planType.numberOfProjects) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PLAN_PROJECT_LIMIT_REACHED',
        {
          organizationId: organization.id,
        }
      );
    }
  }

  const project: ProjectData = {
    membersIds: [user.id],
    adminsIds: [user.id],
    creatorId: user.id,
    organizationId: organization.id,
    ...projectData,
  };

  try {
    const newProject = await projectService.createProject(project);

    const formattedProject = mapProjectToAPI(newProject);

    const responseData = formatResponse<ProjectAPI>({
      message: t({
        en: 'Project created successfully',
        'en-GB': 'Project created successfully',
        fr: 'Projet créé avec succès',
        es: 'Proyecto creado con éxito',
        ru: 'Проект успешно создан',
        ja: 'プロジェクトが正常に作成されました',
        ko: '프로젝트가 성공적으로 생성되었습니다',
        zh: '项目已成功创建',
        de: 'Projekt erfolgreich erstellt',
        ar: 'تم إنشاء المشروع بنجاح',
        it: 'Progetto creato con successo',
        pt: 'Projeto criado com sucesso',
        hi: 'प्रोजेक्ट सफलतापूर्वक बनाया गया',
        tr: 'Proje başarıyla oluşturuldu',
        pl: 'Projekt został pomyślnie utworzony',
        id: 'Proyek berhasil dibuat',
        vi: 'Dự án đã được tạo thành công',
        uk: 'Проєкт успішно створено',
      }),
      description: t({
        en: 'Your project has been created successfully',
        'en-GB': 'Your project has been created successfully',
        fr: 'Votre projet a été créé avec succès',
        es: 'Su proyecto ha sido creado con éxito',
        ru: 'Ваш проект был успешно создан',
        ja: 'プロジェクトは正常に作成されました',
        ko: '프로젝트가 성공적으로 생성되었습니다',
        zh: '您的项目已成功创建',
        de: 'Ihr Projekt wurde erfolgreich erstellt',
        ar: 'لقد تم إنشاء مشروعك بنجاح',
        it: 'Il tuo progetto è stato creato con successo',
        pt: 'Seu projeto foi criado com sucesso',
        hi: 'आपका प्रोजेक्ट सफलतापूर्वक बना लिया गया है',
        tr: 'Projeniz başarıyla oluşturuldu',
        pl: 'Twój projekt został pomyślnie utworzony',
        id: 'Proyek Anda telah berhasil dibuat',
        vi: 'Dự án của bạn đã được tạo thành công',
        uk: 'Ваш проєкт успішно створено',
      }),
      data: formattedProject,
    });

    reply.send(responseData);

    // Create mock data once it's done
    try {
      await createDemoDictionaries([formattedProject.id], user.id);
    } catch {
      // Skip if fail
    }
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UpdateProjectBody = Partial<ProjectAPI>;
export type UpdateProjectResult = ResponseData<ProjectAPI>;

/**
 * Updates an existing project in the database.
 */
export const updateProject = async (
  request: FastifyRequest<{ Body: UpdateProjectBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { organization, project, user, session, roles } = request.session || {};
  const projectData = request.body;

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_DATA_NOT_FOUND'
    );
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  if (String(project.organizationId) !== String(organization.id)) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_IN_ORGANIZATION'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.session,
      targetProjectIds: [String(project.id)],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  if (typeof session === 'undefined') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SESSION_NOT_DEFINED'
    );
  }

  try {
    const existingProject = await projectService.getProjectById(project.id);

    const previousApplicationUrl =
      existingProject.configuration?.editor?.applicationURL;
    const newApplicationUrl = projectData.configuration?.editor?.applicationURL;

    const updatedProject = await projectService.updateProjectById(
      project.id,
      projectData
    );

    // Update session to set activeOrganizationId
    await SessionModel.updateOne(
      { _id: session.id },
      {
        $set: {
          activeOrganizationId: String(organization.id),
          activeProjectId: String(project.id),
        },
      }
    );

    if (user) {
      await userService.updateUserById(user.id, {
        lastActiveOrganizationId: String(organization.id),
        lastActiveProjectId: String(project.id),
      });
    }

    // Fire-and-forget screenshot generation
    refreshProjectScreenshotIfChanged({
      newApplicationUrl,
      previousApplicationUrl,
      existingImageUrl: existingProject.imageUrl,
      projectId: project.id.toString(),
    })
      .then((imageUrl) => {
        if (imageUrl !== undefined) {
          projectService
            .updateProjectById(project.id, { imageUrl })
            .catch(() => {});
        }
      })
      .catch(() => {});

    const formattedProject = mapProjectToAPI(updatedProject);

    const responseData = formatResponse<ProjectAPI>({
      message: t({
        en: 'Project updated successfully',
        'en-GB': 'Project updated successfully',
        fr: 'Projet mis à jour avec succès',
        es: 'Proyecto actualizado con éxito',
        ru: 'Проект успешно обновлен',
        ja: 'プロジェクトが正常に更新されました',
        ko: '프로젝트가 성공적으로 업데이트되었습니다',
        zh: '项目已成功更新',
        de: 'Projekt erfolgreich aktualisiert',
        ar: 'تم تحديث المشروع بنجاح',
        it: 'Progetto aggiornato con successo',
        pt: 'Projeto atualizado com sucesso',
        hi: 'प्रोजेक्ट सफलतापूर्वक अपडेट किया गया',
        tr: 'Proje başarıyla güncellendi',
        pl: 'Projekt został pomyślnie zaktualizowany',
        id: 'Proyek berhasil diperbarui',
        vi: 'Dự án đã được cập nhật thành công',
        uk: 'Проєкт успішно оновлено',
      }),
      description: t({
        en: 'Your project has been updated successfully',
        'en-GB': 'Your project has been updated successfully',
        fr: 'Votre projet a été mis à jour avec succès',
        es: 'Su proyecto ha sido actualizado con éxito',
        ru: 'Ваш проект был успешно обновлен',
        ja: 'プロジェクトは正常に更新されました',
        ko: '프로젝트가 성공적으로 업데이트되었습니다',
        zh: '您的项目已成功更新',
        de: 'Ihr Projekt wurde erfolgreich aktualisiert',
        ar: 'لقد تم تحديث مشروعك بنجاح',
        it: 'Il tuo progetto è stato aggiornato con successo',
        pt: 'Seu projeto foi atualizado com sucesso',
        hi: 'आपका प्रोजेक्ट सफलतापूर्वक अपडेट कर दिया गया है',
        tr: 'Projeniz başarıyla güncellendi',
        pl: 'Twój projekt został pomyślnie zaktualizowany',
        id: 'Proyek Anda telah berhasil diperbarui',
        vi: 'Dự án của bạn đã được cập nhật thành công',
        uk: 'Ваш проєкт успішно оновлено',
      }),
      data: formattedProject,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

type UserAndAdmin = { user: User; isAdmin: boolean };
export type ProjectMemberByIdOption = {
  userId: string | Types.ObjectId;
  isAdmin?: boolean;
};

export type UpdateProjectMembersBody = Partial<{
  membersIds: ProjectMemberByIdOption[];
}>;
export type UpdateProjectMembersResult = ResponseData<ProjectAPI>;

/**
 * Update members to the dictionary in the database.
 */
export const updateProjectMembers = async (
  request: FastifyRequest<{ Body: UpdateProjectMembersBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, organization, roles } = request.session || {};
  const { membersIds } = request.body;

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  if (membersIds?.length === 0) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_MUST_HAVE_MEMBER'
    );
  }

  if (membersIds?.map((el) => el.isAdmin)?.length === 0) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_MUST_HAVE_ADMIN'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.session,
      targetProjectIds: [String(project.id)],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const existingUsers: UserAndAdmin[] = [];

    if (membersIds) {
      const userIdList = membersIds
        ?.filter(
          (member) =>
            // Remove members that are not in the organization
            !organization?.membersIds.includes(member.userId as Types.ObjectId)
        )
        .map((member) => member.userId);

      const users = await userService.getUsersByIds(userIdList);

      if (users) {
        const userMap: UserAndAdmin[] = users.map((user) => ({
          user,
          isAdmin:
            membersIds.find(
              (member) => String(member.userId) === String(user.id)
            )?.isAdmin ?? false,
        }));

        existingUsers.push(...userMap);
      }
    }

    const formattedMembers: Types.ObjectId[] = existingUsers.map(
      (user) => user.user.id
    );
    const formattedAdmin: Types.ObjectId[] = existingUsers
      .filter((el) => el.isAdmin)
      .map((user) => user.user.id);

    const updatedOrganization = await projectService.updateProjectById(
      project.id,
      {
        ...project,
        membersIds: formattedMembers,
        adminsIds: formattedAdmin,
      }
    );

    const formattedProject = mapProjectToAPI(updatedOrganization);

    const responseData = formatResponse<ProjectAPI>({
      message: t({
        en: 'Project members updated successfully',
        'en-GB': 'Project members updated successfully',
        fr: 'Membres du projet mis à jour avec succès',
        es: 'Miembros del proyecto actualizados con éxito',
        ru: 'Члены проекта успешно обновлены',
        ja: 'プロジェクトメンバーが正常に更新されました',
        ko: '프로젝트 구성원이 성공적으로 업데이트되었습니다',
        zh: '项目成员已成功更新',
        de: 'Projektmitglieder erfolgreich aktualisiert',
        ar: 'تم تحديث أعضاء المشروع بنجاح',
        it: 'Membri del progetto aggiornati con successo',
        pt: 'Membros do projeto atualizados com sucesso',
        hi: 'प्रोजेक्ट सदस्य सफलतापूर्वक अपडेट किए गए',
        tr: 'Proje üyeleri başarıyla güncellendi',
        pl: 'Członkowie projektu zostali pomyślnie zaktualizowani',
        id: 'Anggota proyek berhasil diperbarui',
        vi: 'Thành viên dự án đã được cập nhật thành công',
        uk: 'Члени проєкту успішно оновлені',
      }),
      description: t({
        en: 'Your project members have been updated successfully',
        'en-GB': 'Your project members have been updated successfully',
        fr: 'Les membres de votre projet ont été mis à jour avec succès',
        es: 'Los miembros de su proyecto han sido actualizados con éxito',
        ru: 'Члены вашего проекта были успешно обновлены',
        ja: 'プロジェクトメンバーは正常に更新されました',
        ko: '프로젝트 구성원이 성공적으로 업데이트되었습니다',
        zh: '您的项目成员已成功更新',
        de: 'Ihre Projektmitglieder wurden erfolgreich aktualisiert',
        ar: 'لقد تم تحديث أعضاء مشروعك بنجاح',
        it: 'I membri del tuo progetto sono stati aggiornati con successo',
        pt: 'Os membros do seu projeto foram atualizados com sucesso',
        hi: 'आपके प्रोजेक्ट के सदस्यों को सफलतापूर्वक अपडेट किया गया है',
        tr: 'Proje üyeleriniz başarıyla güncellendi',
        pl: 'Członkowie Twojego projektu zostali pomyślnie zaktualizowani',
        id: 'Anggota proyek Anda telah berhasil diperbarui',
        vi: 'Thành viên dự án của bạn đã được cập nhật thành công',
        uk: 'Члени вашого проєкту успішно оновлені',
      }),
      data: formattedProject,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type PushProjectConfigurationBody = ProjectConfiguration;
export type PushProjectConfigurationResult = ResponseData<ProjectConfiguration>;

/**
 * Pushes a project configuration to the database.
 */
export const pushProjectConfiguration = async (
  request: FastifyRequest<{ Body: PushProjectConfigurationBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, roles } = request.session || {};
  const projectConfiguration = request.body;

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.session,
      targetProjectIds: [String(project.id)],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const projectObject = await projectService.getProjectById(project.id);

    // Preserve existing API key if not provided in the update
    if (
      projectConfiguration.ai &&
      !projectConfiguration.ai.apiKey &&
      projectObject.configuration?.ai?.apiKey
    ) {
      projectConfiguration.ai.apiKey = projectObject.configuration.ai.apiKey;
    }

    const previousApplicationUrl =
      projectObject.configuration?.editor?.applicationURL;
    const newApplicationUrl = projectConfiguration.editor?.applicationURL;

    projectObject.configuration = projectConfiguration;

    await projectObject.save();

    // Fire-and-forget screenshot generation
    refreshProjectScreenshotIfChanged({
      newApplicationUrl,
      previousApplicationUrl,
      existingImageUrl: projectObject.imageUrl,
      projectId: project.id.toString(),
    })
      .then((imageUrl) => {
        if (imageUrl !== undefined) {
          projectService
            .updateProjectById(project.id, { imageUrl })
            .catch(() => {});
        }
      })
      .catch(() => {});

    if (!projectObject.configuration) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PROJECT_UPDATE_FAILED',
        {
          projectId: project.id,
        }
      );
    }

    const responseData = formatResponse<ProjectConfiguration>({
      message: t({
        en: 'Project configuration updated successfully',
        'en-GB': 'Project configuration updated successfully',
        fr: 'Configuration du projet mise à jour avec succès',
        es: 'Configuración del proyecto actualizada con éxito',
        ru: 'Конфигурация проекта успешно обновлена',
        ja: 'プロジェクト構成が正常に更新されました',
        ko: '프로젝트 설정이 성공적으로 업데이트되었습니다',
        zh: '项目配置已成功更新',
        de: 'Projektkonfiguration erfolgreich aktualisiert',
        ar: 'تم تحديث تكوين المشروع بنجاح',
        it: 'Configurazione del progetto aggiornata con successo',
        pt: 'Configuração do projeto atualizada com sucesso',
        hi: 'प्रोजेक्ट कॉन्फ़िगरेशन सफलतापूर्वक अपडेट किया गया',
        tr: 'Proje yapılandırması başarıyla güncellendi',
        pl: 'Konfiguracja projektu została pomyślnie zaktualizowana',
        id: 'Konfigurasi proyek berhasil diperbarui',
        vi: 'Cấu hình dự án đã được cập nhật thành công',
        uk: 'Конфігурацію проєкту успішно оновлено',
      }),
      description: t({
        en: 'Your project configuration has been updated successfully',
        'en-GB': 'Your project configuration has been updated successfully',
        fr: 'La configuration du projet a été mise à jour avec succès',
        es: 'Su configuración del proyecto ha sido actualizada con éxito',
        ru: 'Конфигурация вашего проекта была успешно обновлена',
        ja: 'プロジェクト構成は正常に更新されました',
        ko: '프로젝트 설정이 성공적으로 업데이트되었습니다',
        zh: '您的项目配置已成功更新',
        de: 'Ihre Projektkonfiguration wurde erfolgreich aktualisiert',
        ar: 'لقد تم تحديث تكوين مشروعك بنجاح',
        it: 'La configurazione del tuo progetto è stata aggiornata con successo',
        pt: 'A configuração do seu projeto foi atualizada com sucesso',
        hi: 'आपका प्रोजेक्ट कॉन्फ़िगरेशन सफलतापूर्वक अपडेट कर दिया गया है',
        tr: 'Proje yapılandırmanız başarıyla güncellendi',
        pl: 'Konfiguracja Twojego projektu została pomyślnie zaktualizowana',
        id: 'Konfigurasi proyek Anda telah berhasil diperbarui',
        vi: 'Cấu hình dự án của bạn đã được cập nhật thành công',
        uk: 'Конфігурацію вашого проєкту успішно оновлено',
      }),
      data: mapProjectToAPI(projectObject) as ProjectConfiguration,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type TriggerBuildResult = ResponseData<{
  results: Array<{
    target: string;
    success: boolean;
    message?: string;
  }>;
}>;

export type TriggerWebhookBody = {
  webhookIndex: number;
};

export type TriggerWebhookResult = ResponseData<{
  target: string;
  success: boolean;
  message?: string;
}>;

/**
 * Triggers CI builds for a project (Git provider pipelines and webhooks)
 */
export const triggerBuild = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { project, roles } = request.session || {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.session,
      targetProjectIds: [String(project.id)],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    // Get full project with all relations
    const fullProject = await projectService.getProjectById(project.id);
    const results = await webhooksService.triggerAll(fullProject);

    const responseData = formatResponse<{
      results: Array<{
        target: string;
        success: boolean;
        message?: string;
      }>;
    }>({
      message: t({
        en: 'Build triggers initiated',
        'en-GB': 'Build triggers initiated',
        fr: 'Déclenchement des builds initié',
        es: 'Inicio de los triggers de build',
        ru: 'Запуск триггеров сборки инициирован',
        ja: 'ビルドトリガーが開始されました',
        ko: '빌드 트리거가 시작되었습니다',
        zh: '构建触发器已启动',
        de: 'Build-Trigger initiiert',
        ar: 'بدء مشغلات البناء',
        it: 'Trigger di build avviati',
        pt: 'Gatilhos de build iniciados',
        hi: 'बिल्ड ट्रिगर शुरू किए गए',
        tr: 'Build tetikleyicileri başlatıldı',
        pl: 'Zainicjowano wyzwalacze budowania',
        id: 'Pemicu build dimulai',
        vi: 'Đã bắt đầu trình kích hoạt bản dựng',
        uk: 'Запуск тригерів збірки ініційовано',
      }),
      description: t({
        en: 'CI pipelines and webhooks have been triggered',
        'en-GB': 'CI pipelines and webhooks have been triggered',
        fr: 'Les pipelines CI et webhooks ont été déclenchés',
        es: 'Los pipelines CI y webhooks han sido activados',
        ru: 'CI-конвейеры и вебхуки были запущены',
        ja: 'CIパイプラインとウェブフックがトリガーされました',
        ko: 'CI 파이프라인과 웹후크가 트리거되었습니다',
        zh: 'CI 流水线和 Webhook 已触发',
        de: 'CI-Pipelines und Webhooks wurden ausgelöst',
        ar: 'تم تفعيل أنابيب CI والويب هوك',
        it: 'Le pipeline CI e i webhook sono stati attivati',
        pt: 'Pipelines CI e webhooks foram acionados',
        hi: 'CI पाइपलाइन और वेबहुक ट्रिगर किए गए हैं',
        tr: 'CI hatları ve webhooklar tetiklendi',
        pl: 'Potoki CI i webhooki zostały wyzwolone',
        id: 'Pipa CI dan webhook telah dipicu',
        vi: 'Đường ống CI và webhook đã được kích hoạt',
        uk: 'Конвеєри CI та вебхуки були запущені',
      }),
      data: { results },
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Triggers a single webhook by index
 */
export const triggerWebhook = async (
  request: FastifyRequest<{ Body: TriggerWebhookBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, roles } = request.session || {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.session,
      targetProjectIds: [String(project.id)],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const { webhookIndex } = request.body;

    if (typeof webhookIndex !== 'number' || webhookIndex < 0) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'INVALID_REQUEST_BODY'
      );
    }

    // Get full project with all relations
    const fullProject = await projectService.getProjectById(project.id);
    const result = await webhooksService.triggerSingleWebhook(
      fullProject,
      webhookIndex
    );

    const responseData = formatResponse<{
      target: string;
      success: boolean;
      message?: string;
    }>({
      message: t({
        en: 'Webhook triggered',
        'en-GB': 'Webhook triggered',
        fr: 'Webhook déclenché',
        es: 'Webhook activado',
        ru: 'Вебхук запущен',
        ja: 'ウェブフックがトリガーされました',
        ko: '웹후크가 트리거되었습니다',
        zh: 'Webhook 已触发',
        de: 'Webhook ausgelöst',
        ar: 'تم تفعيل الويب هوك',
        it: 'Webhook attivato',
        pt: 'Webhook acionado',
        hi: 'वेबहुक ट्रिगर किया गया',
        tr: 'Webhook tetiklendi',
        pl: 'Webhook został wyzwolony',
        id: 'Webhook dipicu',
        vi: 'Webhook đã được kích hoạt',
        uk: 'Вебхук запущено',
      }),
      description: t({
        en: `Webhook "${result.target}" has been triggered`,
        'en-GB': `Webhook "${result.target}" has been triggered`,
        fr: `Le webhook "${result.target}" a été déclenché`,
        es: `El webhook "${result.target}" ha sido activado`,
        ru: `Вебхук "${result.target}" был запущен`,
        ja: `ウェブフック "${result.target}" がトリガーされました`,
        ko: `웹후크 "${result.target}"가 트리거되었습니다`,
        zh: `Webhook "${result.target}" 已触发`,
        de: `Webhook "${result.target}" wurde ausgelöst`,
        ar: `تم تفعيل الويب هوك "${result.target}"`,
        it: `Il webhook "${result.target}" è stato attivato`,
        pt: `O webhook "${result.target}" foi acionado`,
        hi: `वेबहुक "${result.target}" ट्रिगर किया गया है`,
        tr: `"${result.target}" webhooku tetiklendi`,
        pl: `Webhook "${result.target}" został wyzwolony`,
        id: `Webhook "${result.target}" telah dipicu`,
        vi: `Webhook "${result.target}" đã được kích hoạt`,
        uk: `Вебхук "${result.target}" запущено`,
      }),
      data: result,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type DeleteProjectResult = ResponseData<ProjectAPI>;

/**
 * Deletes a project from the database by its ID.
 */
export const deleteProject = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { user, organization, project, session, roles } =
    _request.session || {};

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (typeof session === 'undefined') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SESSION_NOT_DEFINED'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:admin'
    )({
      ..._request.session,
      targetProjectIds: [String(project.id)],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const projectToDelete = await projectService.getProjectById(project.id);

    if (String(projectToDelete.organizationId) !== String(organization.id)) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PROJECT_NOT_IN_ORGANIZATION'
      );
    }

    const deletedProject = await projectService.deleteProjectById(project.id);

    if (!deletedProject) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PROJECT_NOT_DEFINED',
        {
          projectId: project.id,
        }
      );
    }

    logger.info(`Project deleted: ${String(deletedProject.id)}`);

    const responseData = formatResponse<ProjectAPI>({
      message: t({
        en: 'Project deleted successfully',
        'en-GB': 'Project deleted successfully',
        fr: 'Projet supprimé avec succès',
        es: 'Proyecto eliminado con éxito',
        ru: 'Проект успешно удален',
        ja: 'プロジェクトが正常に削除されました',
        ko: '프로젝트가 성공적으로 삭제되었습니다',
        zh: '项目已成功删除',
        de: 'Projekt erfolgreich gelöscht',
        ar: 'تم حذف المشروع بنجاح',
        it: 'Progetto eliminato con successo',
        pt: 'Projeto excluído com sucesso',
        hi: 'प्रोजेक्ट सफलतापूर्वक हटा दिया गया',
        tr: 'Proje başarıyla silindi',
        pl: 'Projekt został pomyślnie usunięty',
        id: 'Proyek berhasil dihapus',
        vi: 'Dự án đã được xóa thành công',
        uk: 'Проєкт успішно видалено',
      }),
      description: t({
        en: 'Your project has been deleted successfully',
        'en-GB': 'Your project has been deleted successfully',
        fr: 'Votre projet a été supprimé avec succès',
        es: 'Su proyecto ha sido eliminado con éxito',
        ru: 'Ваш проект был успешно удален',
        ja: 'プロジェクトは正常に削除されました',
        ko: '프로젝트가 성공적으로 삭제되었습니다',
        zh: '您的项目已成功删除',
        de: 'Ihr Projekt wurde erfolgreich gelöscht',
        ar: 'لقد تم حذف مشروعك بنجاح',
        it: 'Il tuo progetto è stato eliminato con successo',
        pt: 'Seu projeto foi excluído com sucesso',
        hi: 'आपका प्रोजेक्ट सफलतापूर्वक हटा दिया गया है',
        tr: 'Projeniz başarıyla silindi',
        pl: 'Twój projekt został pomyślnie usunięty',
        id: 'Proyek Anda telah berhasil dihapus',
        vi: 'Dự án của bạn đã được xóa thành công',
        uk: 'Ваш проєкт успішно видалено',
      }),
      data: mapProjectToAPI(deletedProject),
    });

    await SessionModel.updateOne(
      { _id: session.id },
      { $set: { activeProjectId: null } }
    );

    if (user) {
      await userService.updateUserById(user.id, {
        lastActiveProjectId: null,
      });
    }

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type DeleteProjectByIdAdminParams = { projectId: string };
export type DeleteProjectByIdAdminResult = ResponseData<ProjectAPI>;

/**
 * Admin-only: Deletes any project from the database by its ID.
 */
export const deleteProjectByIdAdmin = async (
  request: FastifyRequest<{ Params: DeleteProjectByIdAdminParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { projectId } = request.params;
  const { roles } = request.session || {};

  try {
    const project = await projectService.getProjectById(projectId);

    if (!project) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PROJECT_NOT_DEFINED'
      );
    }

    if (
      !hasPermission(
        roles || [],
        'project:admin'
      )({
        ...request.session,
        targetProjectIds: [String(project.id)],
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    const deletedProject = await projectService.deleteProjectById(project.id);

    if (!deletedProject) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PROJECT_NOT_DEFINED'
      );
    }

    const formattedProject = mapProjectToAPI(deletedProject);
    const responseData = formatResponse<ProjectAPI>({
      message: t({
        en: 'Project deleted',
        fr: 'Projet supprimé',
        es: 'Proyecto eliminado',
        'en-GB': 'Project deleted',
        de: 'Projekt gelöscht',
        ja: 'プロジェクトが削除されました',
        ko: '프로젝트가 삭제되었습니다',
        zh: '项目已删除',
        it: 'Progetto eliminato',
        pt: 'Projeto excluído',
        hi: 'परियोजना हटा दी गई',
        ar: 'تم حذف المشروع',
        ru: 'Проект удален',
        tr: 'Proje silindi',
        pl: 'Projekt usunięty',
        id: 'Proyek dihapus',
        vi: 'Dự án đã bị xóa',
        uk: 'Проєкт видалено',
      }),
      data: formattedProject,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type SelectProjectParam = { projectId: string | Types.ObjectId };
export type SelectProjectResult = ResponseData<ProjectAPI>;

/**
 * Select a project.
 */
export const selectProject = async (
  request: FastifyRequest<{ Params: SelectProjectParam }>,
  reply: FastifyReply
) => {
  const { projectId } = request.params;
  const { session, roles, user } = request.session || {};

  if (!projectId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_ID_NOT_FOUND'
    );
  }

  if (typeof session === 'undefined') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SESSION_NOT_DEFINED'
    );
  }

  try {
    const project = await projectService.getProjectById(projectId);

    if (
      !hasPermission(
        roles || [],
        'project:read'
      )({
        ...request.session,
        targetProjects: [project],
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    // When selecting a project, reset to its default environment
    const defaultEnvId =
      project.environments?.find((e: any) => e.isDefault)?.id ??
      project.environments?.[0]?.id;

    await SessionModel.updateOne(
      { _id: session.id },
      {
        $set: {
          activeProjectId: String(projectId),
          activeEnvironmentId: defaultEnvId ? String(defaultEnvId) : null,
        },
      }
    );

    if (user) {
      await userService.updateUserById(user.id, {
        lastActiveProjectId: String(projectId),
      });
    }

    const responseData = formatResponse<ProjectAPI>({
      message: t({
        en: 'Project selected successfully',
        'en-GB': 'Project selected successfully',
        fr: 'Projet sélectionné avec succès',
        es: 'Proyecto seleccionado con éxito',
        ru: 'Проект успешно выбран',
        ja: 'プロジェクトが正常に選択されました',
        ko: '프로젝트가 성공적으로 선택되었습니다',
        zh: '项目已成功选择',
        de: 'Projekt erfolgreich ausgewählt',
        ar: 'تم اختيار المشروع بنجاح',
        it: 'Progetto selezionato con successo',
        pt: 'Projeto selecionado com sucesso',
        hi: 'प्रोजेक्ट सफलतापूर्वक चुना गया',
        tr: 'Proje başarıyla seçildi',
        pl: 'Projekt został pomyślnie wybrany',
        id: 'Proyek berhasil dipilih',
        vi: 'Dự án đã được chọn thành công',
        uk: 'Проєкт успішно вибрано',
      }),
      description: t({
        en: 'Your project has been selected successfully',
        'en-GB': 'Your project has been selected successfully',
        fr: 'Votre projet a été sélectionné avec succès',
        es: 'Su proyecto ha sido seleccionado con éxito',
        ru: 'Ваш проект был успешно выбран',
        ja: 'プロジェクトは正常に選択されました',
        ko: '프로젝트가 성공적으로 선택되었습니다',
        zh: '您的项目已成功选择',
        de: 'Ihr Projekt wurde erfolgreich ausgewählt',
        ar: 'لقد تم اختيار مشروعك بنجاح',
        it: 'Il tuo progetto è stato selezionato con successo',
        pt: 'Seu projeto foi selecionado com sucesso',
        hi: 'आपका प्रोजेक्ट सफलतापूर्वक चुन लिया गया है',
        tr: 'Projeniz başarıyla seçildi',
        pl: 'Twój projekt został pomyślnie wybrany',
        id: 'Proyek Anda telah berhasil dipilih',
        vi: 'Dự án của bạn đã được chọn thành công',
        uk: 'Ваш проєкт успішно вибрано',
      }),
      data: mapProjectToAPI(project),
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UnselectProjectResult = ResponseData<null>;

/**
 * Unselect a project.
 */
export const unselectProject = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  const { session, user } = _request.session || {};

  if (typeof session === 'undefined') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SESSION_NOT_DEFINED'
    );
  }

  try {
    await SessionModel.updateOne(
      { _id: session.id },
      { $set: { activeProjectId: null, activeEnvironmentId: null } }
    );

    if (user) {
      await userService.updateUserById(user.id, {
        lastActiveProjectId: null,
      });
    }

    const responseData = formatResponse<null>({
      message: t({
        en: 'Project unselected successfully',
        'en-GB': 'Project unselected successfully',
        fr: 'Projet désélectionné avec succès',
        es: 'Proyecto deseleccionado con éxito',
        ru: 'Проект успешно снят с выбора',
        ja: 'プロジェクトの選択が正常に解除されました',
        ko: '프로젝트 선택이 성공적으로 해제되었습니다',
        zh: '项目已成功取消选择',
        de: 'Projekt erfolgreich abgewählt',
        ar: 'تم إلغاء تحديد المشروع بنجاح',
        it: 'Progetto deselezionato con successo',
        pt: 'Projeto desmarcado com sucesso',
        hi: 'प्रोजेक्ट सफलतापूर्वक अनसेलेक्ट किया गया',
        tr: 'Proje seçimi başarıyla kaldırıldı',
        pl: 'Wybór projektu został pomyślnie cofnięty',
        id: 'Proyek berhasil batal dipilih',
        vi: 'Dự án đã được bỏ chọn thành công',
        uk: 'Вибір проєкту успішно скасовано',
      }),
      description: t({
        en: 'Your project has been unselected successfully',
        'en-GB': 'Your project has been unselected successfully',
        fr: 'Votre projet a été désélectionné avec succès',
        es: 'Su proyecto ha sido deseleccionado con éxito',
        ru: 'Выбор вашего проекта был успешно снят',
        ja: 'プロジェクトの選択は正常に解除されました',
        ko: '프로젝트 선택이 성공적으로 해제되었습니다',
        zh: '您的项目已成功取消选择',
        de: 'Ihr Projekt wurde erfolgreich abgewählt',
        ar: 'لقد تم إلغاء تحديد مشروعك بنجاح',
        it: 'Il tuo progetto è stato deselezionato con successo',
        pt: 'Seu projeto foi desmarcado com sucesso',
        hi: 'आपका प्रोजेक्ट सफलतापूर्वक अनसेलेक्ट कर दिया गया है',
        tr: 'Projenizin seçimi başarıyla kaldırıldı',
        pl: 'Wybór Twojego projektu został pomyślnie cofnięty',
        id: 'Proyek Anda telah berhasil batal dipilih',
        vi: 'Dự án của bạn đã được bỏ chọn thành công',
        uk: 'Вибір вашого проєкту успішно скасовано',
      }),
      data: null,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetCIConfigurationResult = ResponseData<ciService.CIStatus>;

/**
 * Get CI configuration status for the current project
 */
export const getCIConfiguration = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { project, user } = request.session || {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  try {
    const ciStatus = await ciService.getCIStatus(project, user.id);

    const responseData = formatResponse<ciService.CIStatus>({
      data: ciStatus,
    });

    return reply.send(responseData);
  } catch (error) {
    if ((error as any)?.isAppError) {
      return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    }
    return ErrorHandler.handleCustomErrorResponse(
      reply,
      'CI_CONFIG_ERROR',
      'CI Configuration Error',
      (error as Error)?.message ?? 'Failed to get CI configuration',
      undefined,
      500
    );
  }
};

export type PushCIConfigurationResult = ResponseData<{ success: boolean }>;

/**
 * Push CI configuration file to the repository
 */
export const pushCIConfiguration = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { project, user } = request.session || {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  try {
    await ciService.installCI(project, user.id);

    const responseData = formatResponse<{ success: boolean }>({
      message: t({
        en: 'CI configuration installed successfully',
        'en-GB': 'CI configuration installed successfully',
        fr: 'Configuration CI installée avec succès',
        es: 'Configuración CI instalada con éxito',
        ru: 'CI-конфигурация успешно установлена',
        ja: 'CI構成が正常にインストールされました',
        ko: 'CI 설정이 성공적으로 설치되었습니다',
        zh: 'CI 配置已成功安装',
        de: 'CI-Konfiguration erfolgreich installiert',
        ar: 'تم تثبيت تكوين CI بنجاح',
        it: 'Configurazione CI installata con successo',
        pt: 'Configuração CI installada com successo',
        hi: 'CI कॉन्फ़िगरेशन सफलतापूर्वक स्थापित किया गया',
        tr: 'CI yapılandırması başarıyla yüklendi',
        pl: 'Konfiguracja CI została pomyślnie zainstalowana',
        id: 'Konfigurasi CI berhasil diinstal',
        vi: 'Cài đặt cấu hình CI thành công',
        uk: 'Конфігурацію CI успішно встановлено',
      }),
      description: t({
        en: 'The CI workflow file has been added to your repository',
        'en-GB': 'The CI workflow file has been added to your repository',
        fr: 'Le fichier de workflow CI a été ajouté à votre dépôt',
        es: 'El archivo de flujo de trabajo CI se ha agregado a su repositorio',
        ru: 'Файл рабочего процесса CI был добавлен в ваш репозиторий',
        ja: 'CIワークフローファイルがリポジトリに追加されました',
        ko: 'CI 워크플로 파일이 저장소에 추가되었습니다',
        zh: 'CI 工作流文件已添加到您的存储库中',
        de: 'Die CI-Workflow-Datei wurde Ihrem Repository hinzugefügt',
        ar: 'تمت إضافة ملف سير عمل CI إلى مستودعك',
        it: 'Il file del workflow CI è stato aggiunto al tuo repository',
        pt: 'O arquivo de fluxo de trabalho CI foi adicionado ao seu repositório',
        hi: 'CI वर्कफ़्लो फ़ाइल आपके रिपॉजिटरी में जोड़ दी गई है',
        tr: 'CI iş akışı dosyası deponuza eklendi',
        pl: 'Plik przepływu pracy CI został dodany do Twojego repozytorium',
        id: 'File alur kerja CI telah ditambahkan ke repositori Anda',
        vi: 'Tệp quy trình làm việc CI đã được thêm vào kho lưu trữ của bạn',
        uk: 'Файл робочого процесу CI додано до вашого репозиторію',
      }),
      data: { success: true },
    });

    return reply.send(responseData);
  } catch (error) {
    if ((error as any)?.isAppError) {
      return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    }
    return ErrorHandler.handleCustomErrorResponse(
      reply,
      'CI_INSTALL_ERROR',
      'CI Installation Error',
      (error as Error)?.message ?? 'Failed to install CI configuration',
      undefined,
      500
    );
  }
};
