import { SessionModel } from '@schemas/session.schema';
import * as dictionaryService from '@services/dictionary.service';
import * as projectService from '@services/project.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import {
  mapProjectToAPI,
  PRODUCTION_ENV_SENTINEL_ID,
} from '@utils/mapper/project';
import { hasPermission } from '@utils/permissions';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import type { EnvironmentAPI, EnvironmentData } from '@/types/project.types';

// ─── helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns the value to store in `session.activeEnvironmentId`.
 * Convention: null = production (default env); ObjectId string = any other env.
 */
const toSessionEnvironmentId = (
  isDefault: boolean,
  environmentId: string
): string | null => (isDefault ? null : environmentId);

/**
 * Returns the MongoDB filter for a dictionary's `environmentId` field.
 * Production dictionaries are stored with environmentId = null.
 */
const toDictionaryEnvironmentFilter = (
  isDefaultEnvironment: boolean,
  environmentId: string
) =>
  isDefaultEnvironment || environmentId === PRODUCTION_ENV_SENTINEL_ID
    ? { $or: [{ environmentId: null }, { environmentId: { $exists: false } }] }
    : { environmentId };

/**
 * The environmentId to store on a newly created dictionary.
 * null = production (default); real ObjectId = specific env.
 */
const toDictionaryEnvironmentId = (
  isDefaultEnvironment: boolean,
  environmentId: string
): string | null =>
  isDefaultEnvironment || environmentId === PRODUCTION_ENV_SENTINEL_ID
    ? null
    : environmentId;

// ─── Add ──────────────────────────────────────────────────────────────────────

export type AddEnvironmentBody = Pick<
  EnvironmentData,
  'name' | 'configuration'
>;
export type AddEnvironmentResult = ResponseData<EnvironmentAPI[]>;

export const addEnvironment = async (
  request: FastifyRequest<{ Body: AddEnvironmentBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, roles } = request.session || {};
  const { name, configuration } = request.body;

  if (!user)
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  if (!project)
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  if (!name?.trim())
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'INVALID_REQUEST_BODY'
    );
  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.session,
      targetProjectIds: [String(project.id)],
    })
  )
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');

  try {
    const projectDoc = await projectService.getProjectById(project.id);

    const sanitizedName = name.trim().replace(/\s+/g, '_');

    const existingNames = (projectDoc.environments ?? []).map((environment) =>
      environment.name.toLowerCase()
    );
    if (existingNames.includes(sanitizedName.toLowerCase()))
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ENVIRONMENT_ALREADY_EXISTS'
      );

    (projectDoc.environments as any[]).push({
      name: sanitizedName,
      isDefault: false,
      ...(configuration ? { configuration } : {}),
    });

    await projectDoc.save();

    return reply.send(
      formatResponse<EnvironmentAPI[]>({
        message: t({
          en: 'Environment created',
          'en-GB': 'Environment created',
          fr: 'Environnement créé',
          es: 'Entorno creado',
          ru: 'Среда создана',
          ja: '環境が作成されました',
          ko: '환경이 생성되었습니다',
          zh: '环境已创建',
          de: 'Umgebung erstellt',
          ar: 'تم إنشاء البيئة',
          it: 'Ambiente creato',
          pt: 'Ambiente criado',
          hi: 'वातावरण बनाया गया',
          tr: 'Ortam oluşturuldu',
          pl: 'Środowisko zostało utworzone',
          id: 'Lingkungan dibuat',
          vi: 'Môi trường đã được tạo',
          uk: 'Середовище створено',
        }),
        data: mapProjectToAPI(projectDoc).environments as EnvironmentAPI[],
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

// ─── Update ───────────────────────────────────────────────────────────────────

export type UpdateEnvironmentParams = { environmentId: string };
export type UpdateEnvironmentBody = Partial<
  Pick<EnvironmentData, 'name' | 'configuration'>
>;
export type UpdateEnvironmentResult = ResponseData<EnvironmentAPI[]>;

export const updateEnvironment = async (
  request: FastifyRequest<{
    Params: UpdateEnvironmentParams;
    Body: UpdateEnvironmentBody;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, roles } = request.session || {};
  const { environmentId } = request.params;
  const { name, configuration } = request.body;

  if (!user)
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  if (!project)
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.session,
      targetProjectIds: [String(project.id)],
    })
  )
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');

  try {
    const projectDoc = await projectService.getProjectById(project.id);
    const environment = (projectDoc.environments ?? []).find(
      (env) => String(env.id) === environmentId
    );

    if (!environment)
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ENVIRONMENT_NOT_FOUND'
      );

    if (name) (environment as any).name = name.trim().replace(/\s+/g, '_');
    if (configuration !== undefined)
      (environment as any).configuration = configuration;

    await projectDoc.save();

    return reply.send(
      formatResponse<EnvironmentAPI[]>({
        message: t({
          en: 'Environment updated',
          'en-GB': 'Environment updated',
          fr: 'Environnement mis à jour',
          es: 'Entorno actualizado',
          ru: 'Среда обновлена',
          ja: '環境が更新されました',
          ko: '환경이 업데이트되었습니다',
          zh: '环境已更新',
          de: 'Umgebung aktualisiert',
          ar: 'تم تحديث البيئة',
          it: 'Ambiente aggiornato',
          pt: 'Ambiente atualizado',
          hi: 'वातावरण अपडेट किया गया',
          tr: 'Ortam güncellendi',
          pl: 'Środowisko zaktualizowane',
          id: 'Lingkungan diperbarui',
          vi: 'Môi trường đã được cập nhật',
          uk: 'Середовище оновлено',
        }),
        data: mapProjectToAPI(projectDoc).environments as EnvironmentAPI[],
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

// ─── Delete ───────────────────────────────────────────────────────────────────

export type DeleteEnvironmentParams = { environmentId: string };
export type DeleteEnvironmentResult = ResponseData<EnvironmentAPI[]>;

export const deleteEnvironment = async (
  request: FastifyRequest<{ Params: DeleteEnvironmentParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, session, roles } = request.session || {};
  const { environmentId } = request.params;

  if (!user)
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  if (!project)
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  if (typeof session === 'undefined')
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SESSION_NOT_DEFINED'
    );
  if (
    !hasPermission(
      roles || [],
      'project:admin'
    )({
      ...request.session,
      targetProjectIds: [String(project.id)],
    })
  )
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');

  try {
    const projectDoc = await projectService.getProjectById(project.id);
    const environmentIndex = (projectDoc.environments ?? []).findIndex(
      (env) => String(env.id) === environmentId
    );

    if (environmentIndex === -1)
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ENVIRONMENT_NOT_FOUND'
      );

    if (projectDoc.environments![environmentIndex]?.isDefault)
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'CANNOT_DELETE_DEFAULT_ENVIRONMENT'
      );

    projectDoc.environments!.splice(environmentIndex, 1);
    await projectDoc.save();

    // If the deleted env was active in this session, reset to production (null)
    if (
      session &&
      String((session as any).activeEnvironmentId) === environmentId
    ) {
      await SessionModel.updateOne(
        { _id: session.id },
        { $set: { activeEnvironmentId: null } }
      );
    }

    return reply.send(
      formatResponse<EnvironmentAPI[]>({
        message: t({
          en: 'Environment deleted',
          'en-GB': 'Environment deleted',
          fr: 'Environnement supprimé',
          es: 'Entorno eliminado',
          ru: 'Среда удалена',
          ja: '環境が削除されました',
          ko: '환경이 삭제되었습니다',
          zh: '环境已删除',
          de: 'Umgebung gelöscht',
          ar: 'تم حذف البيئة',
          it: 'Ambiente eliminato',
          pt: 'Ambiente excluído',
          hi: 'वातावरण हटा दिया गया',
          tr: 'Ortam silindi',
          pl: 'Środowisko usunięte',
          id: 'Lingkungan dihapus',
          vi: 'Môi trường đã bị xóa',
          uk: 'Середовище видалено',
        }),
        data: mapProjectToAPI(projectDoc).environments as EnvironmentAPI[],
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

// ─── Select ───────────────────────────────────────────────────────────────────

export type SelectEnvironmentParams = { environmentId: string };
export type SelectEnvironmentResult = ResponseData<EnvironmentAPI>;

export const selectEnvironment = async (
  request: FastifyRequest<{ Params: SelectEnvironmentParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, session } = request.session || {};
  const { environmentId } = request.params;

  if (!user)
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  if (!project)
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  if (typeof session === 'undefined')
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SESSION_NOT_DEFINED'
    );

  try {
    const projectDoc = await projectService.getProjectById(project.id);
    const environment = (projectDoc.environments ?? []).find(
      (env) => String(env.id) === environmentId
    );

    if (!environment)
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ENVIRONMENT_NOT_FOUND'
      );

    // Store null for the default (production) env; the real ObjectId for others
    const sessionEnvironmentId = toSessionEnvironmentId(
      environment.isDefault,
      environmentId
    );

    await SessionModel.updateOne(
      { _id: session.id },
      { $set: { activeEnvironmentId: sessionEnvironmentId } }
    );

    const environmentAPI: EnvironmentAPI = {
      ...environment,
      id: String(environment.id),
    } as any;

    return reply.send(
      formatResponse<EnvironmentAPI>({
        message: t({
          en: 'Environment selected',
          'en-GB': 'Environment selected',
          fr: 'Environnement sélectionné',
          es: 'Entorno seleccionado',
          ru: 'Среда выбрана',
          ja: '環境が選択されました',
          ko: '환경이 선택되었습니다',
          zh: '环境已选择',
          de: 'Umgebung ausgewählt',
          ar: 'تم تحديد البيئة',
          it: 'Ambiente selezionato',
          pt: 'Ambiente selecionado',
          hi: 'वातावरण चुना गया',
          tr: 'Ortam seçildi',
          pl: 'Środowisko wybrane',
          id: 'Lingkungan dipilih',
          vi: 'Môi trường đã được chọn',
          uk: 'Середовище вибрано',
        }),
        data: environmentAPI,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

// ─── Reset to production ──────────────────────────────────────────────────────

export type ResetToProductionEnvironmentResult =
  ResponseData<EnvironmentAPI | null>;

/**
 * Resets the active environment to production (the default).
 * Stores null in `session.activeEnvironmentId` per the null = production convention.
 */
export const resetToProductionEnvironment = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, session } = request.session || {};

  if (!user)
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  if (!project)
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  if (typeof session === 'undefined')
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SESSION_NOT_DEFINED'
    );

  try {
    await SessionModel.updateOne(
      { _id: session.id },
      { $set: { activeEnvironmentId: null } }
    );

    // Return the default env for display if one exists in DB
    const projectDoc = await projectService.getProjectById(project.id);
    const defaultEnvironment =
      (projectDoc.environments ?? []).find((env) => env.isDefault) ?? null;

    const environmentAPI: EnvironmentAPI | null = defaultEnvironment
      ? ({ ...defaultEnvironment, id: String(defaultEnvironment.id) } as any)
      : null;

    return reply.send(
      formatResponse<EnvironmentAPI | null>({
        message: t({
          en: 'Switched to production',
          'en-GB': 'Switched to production',
          fr: 'Basculé sur production',
          es: 'Cambiado a producción',
          ru: 'Переключено на production',
          ja: 'productionに切り替えました',
          ko: 'production으로 전환되었습니다',
          zh: '已切换到 production',
          de: 'Zu production gewechselt',
          ar: 'تم التبديل إلى production',
          it: 'Passato a production',
          pt: 'Mudado para production',
          hi: 'production में बदल दिया गया',
          tr: "production'a geçildi",
          pl: 'Przełączono na production',
          id: 'Beralih ke production',
          vi: 'Đã chuyển sang production',
          uk: 'Перемкнуто на production',
        }),
        data: environmentAPI,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

// ─── Migrate ──────────────────────────────────────────────────────────────────

export type MigrateEnvironmentBody = {
  sourceEnvironmentId: string;
  targetEnvironmentId: string;
  strategy: 'overwrite' | 'fill-missing';
  migrateContent?: boolean;
  migrateConfiguration?: boolean;
};
export type MigrateEnvironmentResult = ResponseData<{
  migratedDictionaries: number;
  skippedDictionaries: number;
  configurationMigrated: boolean;
}>;

export const migrateEnvironment = async (
  request: FastifyRequest<{ Body: MigrateEnvironmentBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, roles } = request.session || {};
  const {
    sourceEnvironmentId,
    targetEnvironmentId,
    strategy,
    migrateContent = true,
    migrateConfiguration = false,
  } = request.body;

  if (!user)
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  if (!project)
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.session,
      targetProjectIds: [String(project.id)],
    })
  )
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  if (!sourceEnvironmentId || !targetEnvironmentId)
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'INVALID_REQUEST_BODY'
    );
  if (sourceEnvironmentId === targetEnvironmentId)
    return ErrorHandler.handleGenericErrorResponse(reply, 'INVALID_MIGRATION');

  try {
    const projectDoc = await projectService.getProjectById(project.id);
    const projectEnvironments = projectDoc.environments ?? [];

    const isProductionSource =
      sourceEnvironmentId === PRODUCTION_ENV_SENTINEL_ID;
    const isProductionTarget =
      targetEnvironmentId === PRODUCTION_ENV_SENTINEL_ID;

    const sourceEnvironment = isProductionSource
      ? (projectEnvironments.find((env) => env.isDefault) ?? {
          isDefault: true,
          id: null,
        })
      : projectEnvironments.find(
          (env) => String(env.id) === sourceEnvironmentId
        );

    const targetEnvironment = isProductionTarget
      ? (projectEnvironments.find((env) => env.isDefault) ?? {
          isDefault: true,
          id: null,
        })
      : projectEnvironments.find(
          (env) => String(env.id) === targetEnvironmentId
        );

    if (!sourceEnvironment)
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ENVIRONMENT_NOT_FOUND'
      );
    if (!targetEnvironment)
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ENVIRONMENT_NOT_FOUND'
      );

    let migratedDictionaries = 0;
    let skippedDictionaries = 0;
    let configurationMigrated = false;

    if (migrateContent) {
      // Use null filter for production (default) env, ObjectId for others
      const sourceDictionaryFilter = {
        projectIds: project.id,
        ...toDictionaryEnvironmentFilter(
          sourceEnvironment.isDefault,
          sourceEnvironmentId
        ),
      };

      const targetDictionaryFilter = {
        projectIds: project.id,
        ...toDictionaryEnvironmentFilter(
          targetEnvironment.isDefault,
          targetEnvironmentId
        ),
      };

      const [sourceDictionaries, targetDictionaries] = await Promise.all([
        dictionaryService.findDictionaries(sourceDictionaryFilter, 0, 10000),
        dictionaryService.findDictionaries(targetDictionaryFilter, 0, 10000),
      ]);

      const targetKeySet = new Set(
        targetDictionaries.map((dictionary) => dictionary.key)
      );

      const newDictionaryEnvironmentId = toDictionaryEnvironmentId(
        targetEnvironment.isDefault,
        targetEnvironmentId
      );

      for (const sourceDictionary of sourceDictionaries) {
        const existsInTarget = targetKeySet.has(sourceDictionary.key);

        if (existsInTarget && strategy === 'fill-missing') {
          skippedDictionaries++;
          continue;
        }

        if (existsInTarget && strategy === 'overwrite') {
          const existingDictionary = targetDictionaries.find(
            (dictionary) => dictionary.key === sourceDictionary.key
          );
          if (existingDictionary) {
            await dictionaryService.deleteDictionaryById(
              String(existingDictionary.id)
            );
          }
        }

        await dictionaryService.createDictionary({
          key: sourceDictionary.key,
          title: sourceDictionary.title,
          description: sourceDictionary.description,
          tags: sourceDictionary.tags,
          content: sourceDictionary.content as any,
          projectIds: sourceDictionary.projectIds as any[],
          creatorId: user.id,
          environmentId: newDictionaryEnvironmentId,
        });

        migratedDictionaries++;
      }
    }

    if (migrateConfiguration && (sourceEnvironment as any).configuration) {
      (targetEnvironment as any).configuration = (
        sourceEnvironment as any
      ).configuration;
      await projectDoc.save();
      configurationMigrated = true;
    }

    return reply.send(
      formatResponse<{
        migratedDictionaries: number;
        skippedDictionaries: number;
        configurationMigrated: boolean;
      }>({
        message: t({
          en: 'Migration completed',
          'en-GB': 'Migration completed',
          fr: 'Migration terminée',
          es: 'Migración completada',
          ru: 'Миграция завершена',
          ja: '移行が完了しました',
          ko: '마이그레이션 완료',
          zh: '迁移完成',
          de: 'Migration abgeschlossen',
          ar: 'اكتملت الهجرة',
          it: 'Migrazione completata',
          pt: 'Migração concluída',
          hi: 'माइग्रेशन पूर्ण हुआ',
          tr: 'Geçiş tamamlandı',
          pl: 'Migracja zakończona',
          id: 'Migrasi selesai',
          vi: 'Di chuyển hoàn tất',
          uk: 'Міграцію завершено',
        }),
        data: {
          migratedDictionaries,
          skippedDictionaries,
          configurationMigrated,
        },
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
