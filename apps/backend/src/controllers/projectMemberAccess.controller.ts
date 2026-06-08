import { ProjectModel } from '@schemas/project.schema';
import { type AppError, ErrorHandler } from '@utils/errors';
import { hasPermission } from '@utils/permissions';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import type {
  ProjectMemberGranularAccess,
  ProjectMemberGranularAccessAPI,
} from '@/types/project.types';

export type UpdateMemberAccessParams = { userId: string };

export type UpdateMemberAccessBody = {
  /** null = unrestricted; [] = no env access; array = env IDs (null item = production). */
  allowedEnvironmentIds: (string | null)[] | null;
  /** null = unrestricted; [] = no locale access; array of locale strings. */
  allowedLocales: string[] | null;
};

export type UpdateMemberAccessResult =
  ResponseData<ProjectMemberGranularAccessAPI>;

/**
 * Updates granular access constraints for a project member.
 * Requires project:write on the current project.
 */
export const updateMemberAccess = async (
  request: FastifyRequest<{
    Params: UpdateMemberAccessParams;
    Body: UpdateMemberAccessBody;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, roles } = request.session || {};
  const { userId } = request.params;
  const { allowedEnvironmentIds, allowedLocales } = request.body;

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!userId) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.session,
      targetProjectIds: [project.id],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const projectDoc = await ProjectModel.findById(project.id);

    if (!projectDoc) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PROJECT_NOT_DEFINED'
      );
    }

    const memberAccessArray =
      projectDoc.memberAccess as unknown as ProjectMemberGranularAccess[];

    const existingIndex = memberAccessArray.findIndex(
      (entry) => String(entry.userId) === String(userId)
    );

    const accessEntry = {
      userId,
      allowedEnvironmentIds: allowedEnvironmentIds ?? null,
      allowedLocales:
        (allowedLocales as ProjectMemberGranularAccess['allowedLocales']) ??
        null,
    };

    if (existingIndex >= 0) {
      memberAccessArray[existingIndex] =
        accessEntry as unknown as ProjectMemberGranularAccess;
    } else {
      memberAccessArray.push(
        accessEntry as unknown as ProjectMemberGranularAccess
      );
    }

    await projectDoc.save();

    const responseData = formatResponse<ProjectMemberGranularAccessAPI>({
      message: t({
        en: 'Member access updated successfully',
        fr: 'Accès du membre mis à jour avec succès',
        es: 'Acceso del miembro actualizado con éxito',
        de: 'Mitgliederzugriff erfolgreich aktualisiert',
        ja: 'メンバーアクセスが正常に更新されました',
        ko: '멤버 액세스가 성공적으로 업데이트되었습니다',
        zh: '成员访问权限已成功更新',
        ar: 'تم تحديث وصول العضو بنجاح',
        it: 'Accesso del membro aggiornato con successo',
        pt: 'Acesso do membro atualizado com sucesso',
        'en-GB': 'Member access updated successfully',
        hi: 'सदस्य पहुँच सफलतापूर्वक अपडेट की गई',
        tr: 'Üye erişimi başarıyla güncellendi',
        pl: 'Dostęp członka został pomyślnie zaktualizowany',
        id: 'Akses anggota berhasil diperbarui',
        vi: 'Quyền truy cập thành viên đã được cập nhật thành công',
        ru: 'Доступ участника успешно обновлён',
        uk: 'Доступ учасника успішно оновлено',
      }),
      data: accessEntry as unknown as ProjectMemberGranularAccessAPI,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
