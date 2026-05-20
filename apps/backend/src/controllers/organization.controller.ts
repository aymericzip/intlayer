import { logger } from '@logger';
import { SessionModel } from '@schemas/session.schema';
import { sendEmail } from '@services/email.service';
import * as organizationService from '@services/organization.service';
import * as projectService from '@services/project.service';
import * as userService from '@services/user.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getOrganizationFiltersAndPagination,
  type OrganizationFiltersParams,
} from '@utils/filtersAndPagination/getOrganizationFiltersAndPagination';
import {
  mapOrganizationsToAPI,
  mapOrganizationToAPI,
} from '@utils/mapper/organization';
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
import Stripe from 'stripe';
import type {
  Organization,
  OrganizationAPI,
  OrganizationCreationData,
} from '@/types/organization.types';
import type { User, UserAPI } from '@/types/user.types';

export type GetOrganizationsParams =
  FiltersAndPagination<OrganizationFiltersParams>;
export type GetOrganizationsResult = PaginatedResponse<OrganizationAPI>;

/**
 * Retrieves a list of organizations based on filters and pagination.
 */
export const getOrganizations = async (
  request: FastifyRequest<{ Querystring: GetOrganizationsParams }>,
  reply: FastifyReply
) => {
  const { user, roles } = request.session || {};
  const { filters, sortOptions, pageSize, skip, page, getNumberOfPages } =
    getOrganizationFiltersAndPagination(request);

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  try {
    const organizations = await organizationService.findOrganizations(
      filters,
      skip,
      pageSize,
      sortOptions
    );

    if (
      !hasPermission(
        roles || [],
        'organization:read'
      )({
        ...request.session,
        targetOrganizations: organizations,
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    const totalItems = await organizationService.countOrganizations(filters);

    const responseData = formatPaginatedResponse<OrganizationAPI>({
      data: mapOrganizationsToAPI(organizations),
      page,
      pageSize,
      totalPages: getNumberOfPages(totalItems),
      totalItems,
    });

    return reply.code(200).send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetOrganizationParam = { organizationId: string };
export type GetOrganizationResult = ResponseData<OrganizationAPI>;

/**
 * Retrieves an organization by its ID.
 */
export const getOrganization = async (
  request: FastifyRequest<{ Params: GetOrganizationParam }>,
  reply: FastifyReply
): Promise<void> => {
  const { roles } = request.session || {};
  const { organizationId } = request.params;

  if (!organizationId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_ID_NOT_FOUND'
    );
  }

  try {
    const organization =
      await organizationService.getOrganizationById(organizationId);

    if (
      !hasPermission(
        roles || [],
        'organization:read'
      )({
        ...request.session,
        targetOrganizations: [organization],
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    const responseData = formatResponse<OrganizationAPI>({
      data: mapOrganizationToAPI(organization),
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type AddOrganizationBody = OrganizationCreationData;
export type AddOrganizationResult = ResponseData<OrganizationAPI>;

/**
 * Adds a new organization to the database.
 */
export const addOrganization = async (
  request: FastifyRequest<{ Body: AddOrganizationBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user } = request.session || {};
  const organization = request.body;

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_DATA_NOT_FOUND'
    );
  }

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  try {
    const newOrganization = await organizationService.createOrganization(
      organization,
      user.id
    );

    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization created successfully',
        'en-GB': 'Organization created successfully',
        fr: 'Organisation créée avec succès',
        es: 'Organización creada con éxito',
        ru: 'Организация успешно создана',
        ja: '組織が正常に作成されました',
        ko: '조직이 성공적으로 생성되었습니다',
        zh: '组织已成功创建',
        de: 'Organisation erfolgreich erstellt',
        ar: 'تم إنشاء المنظمة بنجاح',
        it: 'Organizzazione creata con successo',
        pt: 'Organização criada com sucesso',
        hi: 'संगठन सफलतापूर्वक बनाया गया',
        tr: 'Organizasyon başarıyla oluşturuldu',
        pl: 'Organizacja została pomyślnie utworzona',
        id: 'Organisasi berhasil dibuat',
        vi: 'Tổ chức đã được tạo thành công',
        uk: 'Організацію успішно створено',
      }),
      description: t({
        en: 'Your organization has been created successfully',
        'en-GB': 'Your organization has been created successfully',
        fr: 'Votre organisation a été créée avec succès',
        es: 'Su organización ha sido creada con éxito',
        ru: 'Ваша организация была успешно создана',
        ja: '組織は正常に作成されました',
        ko: '조직이 성공적으로 생성되었습니다',
        zh: '您的组织已成功创建',
        de: 'Ihre Organisation wurde erfolgreich erstellt',
        ar: 'لقد تم إنشاء منظمتك بنجاح',
        it: 'La tua organizzazione è stata creata con successo',
        pt: 'Sua organização foi criada com sucesso',
        hi: 'आपका संगठन सफलतापूर्वक बना लिया गया है',
        tr: 'Organizasyonunuz başarıyla oluşturuldu',
        pl: 'Twoja organizacja została pomyślnie utworzona',
        id: 'Organisasi Anda telah berhasil dibuat',
        vi: 'Tổ chức của bạn đã được tạo thành công',
        uk: 'Вашу організацію успішно створено',
      }),
      data: mapOrganizationToAPI(newOrganization),
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UpdateOrganizationBody = Partial<Organization>;
export type UpdateOrganizationResult = ResponseData<OrganizationAPI>;

/**
 * Updates an existing organization in the database.
 */
export const updateOrganization = async (
  request: FastifyRequest<{ Body: UpdateOrganizationBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { organization, roles } = request.session || {};
  const organizationFields = request.body;

  if (!organizationFields) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_DATA_NOT_FOUND'
    );
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'organization:write'
    )({
      ...request.session,
      targetOrganizations: [organization],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const updatedOrganization =
      await organizationService.updateOrganizationById(
        organization.id,
        organizationFields
      );

    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization updated successfully',
        'en-GB': 'Organization updated successfully',
        fr: 'Organisation mise à jour avec succès',
        es: 'Organización actualizada con éxito',
        ru: 'Организация успешно обновлена',
        ja: '組織が正常に更新されました',
        ko: '조직이 성공적으로 업데이트되었습니다',
        zh: '组织已成功更新',
        de: 'Organisation erfolgreich aktualisiert',
        ar: 'تم تحديث المنظمة بنجاح',
        it: 'Organizzazione aggiornata con successo',
        pt: 'Organização atualizada com sucesso',
        hi: 'संगठन सफलतापूर्वक अपडेट किया गया',
        tr: 'Organizasyon başarıyla güncellendi',
        pl: 'Organizacja została pomyślnie zaktualizowana',
        id: 'Organisasi berhasil diperbarui',
        vi: 'Tổ chức đã được cập nhật thành công',
        uk: 'Організацію успішно оновлено',
      }),
      description: t({
        en: 'Your organization has been updated successfully',
        'en-GB': 'Your organization has been updated successfully',
        fr: 'Votre organisation a été mise à jour avec succès',
        es: 'Su organización ha sido actualizada con éxito',
        ru: 'Ваша организация была успешно обновлена',
        ja: '組織は正常に更新されました',
        ko: '조직이 성공적으로 업데이트되었습니다',
        zh: '您的组织已成功更新',
        de: 'Ihre Organisation wurde erfolgreich aktualisiert',
        ar: 'لقد تم تحديث منظمتك بنجاح',
        it: 'La tua organizzazione è stata aggiornata con successo',
        pt: 'Sua organização foi atualizada com sucesso',
        hi: 'आपका संगठन सफलतापूर्वक अपडेट कर दिया गया है',
        tr: 'Organizasyonunuz başarıyla güncellendi',
        pl: 'Twoja organizacja została pomyślnie zaktualizowana',
        id: 'Organisasi Anda telah berhasil diperbarui',
        vi: 'Tổ chức của bạn đã được cập nhật thành công',
        uk: 'Вашу організацію успішно оновлено',
      }),
      data: mapOrganizationToAPI(updatedOrganization),
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type AddOrganizationMemberBody = {
  userEmail: string;
};
export type AddOrganizationMemberResult = ResponseData<OrganizationAPI>;

/**
 * Add member to the organization in the database.
 */
export const addOrganizationMember = async (
  request: FastifyRequest<{ Body: AddOrganizationMemberBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { organization, user, roles } = request.session || {};
  const { userEmail } = request.body;

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
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

  const planType = getPlanDetails(organization.plan);

  if (
    planType.numberOfOrganizationUsers &&
    organization.membersIds.length >= planType.numberOfOrganizationUsers
  ) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PLAN_USER_LIMIT_REACHED',
      {
        organizationId: organization.id,
      }
    );
  }

  try {
    let newMember = await userService.getUserByEmail(userEmail);

    if (!newMember) {
      // Create user if not found
      const newUser = await userService.createUser({ email: userEmail });
      if (!newUser) {
        return ErrorHandler.handleGenericErrorResponse(
          reply,
          'USER_CREATION_FAILED',
          {
            email: userEmail,
          }
        );
      }

      newMember = newUser;
    }

    const updatedOrganization =
      await organizationService.updateOrganizationById(organization.id, {
        ...organization,
        membersIds: [...organization.membersIds, newMember.id],
      });

    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization updated successfully',
        'en-GB': 'Organization updated successfully',
        fr: 'Organisation mise à jour avec succès',
        es: 'Organización actualizada con éxito',
        ru: 'Организация успешно обновлена',
        ja: '組織が正常に更新されました',
        ko: '조직이 성공적으로 업데이트되었습니다',
        zh: '组织已成功更新',
        de: 'Organisation erfolgreich aktualisiert',
        ar: 'تم تحديث المنظمة بنجاح',
        it: 'Organizzazione aggiornata con successo',
        pt: 'Organização atualizada com sucesso',
        hi: 'संगठन सफलतापूर्वक अपडेट किया गया',
        tr: 'Organizasyon başarıyla güncellendi',
        pl: 'Organizacja została pomyślnie zaktualizowana',
        id: 'Organisasi berhasil diperbarui',
        vi: 'Tổ chức đã được cập nhật thành công',
        uk: 'Організацію успішно оновлено',
      }),
      description: t({
        en: 'Your organization has been updated successfully',
        'en-GB': 'Your organization has been updated successfully',
        fr: 'Votre organisation a été mise à jour avec succès',
        es: 'Su organización ha sido actualizada con éxito',
        ru: 'Ваша организация была успешно обновлена',
        ja: '組織は正常に更新されました',
        ko: '조직이 성공적으로 업데이트되었습니다',
        zh: '您的组织已成功更新',
        de: 'Ihre Organisation wurde erfolgreich aktualisiert',
        ar: 'لقد تم تحديث منظمتك بنجاح',
        it: 'La tua organizzazione è stata aggiornata con successo',
        pt: 'Sua organização foi atualizada com sucesso',
        hi: 'आपका संगठन सफलतापूर्वक अपडेट कर दिया गया है',
        tr: 'Organizasyonunuz başarıyla güncellendi',
        pl: 'Twoja organizacja została pomyślnie zaktualizowana',
        id: 'Organisasi Anda telah berhasil diperbarui',
        vi: 'Tổ chức của bạn đã được cập nhật thành công',
        uk: 'Вашу організацію успішно оновлено',
      }),
      data: mapOrganizationToAPI(updatedOrganization),
    });

    await sendEmail({
      type: 'invite',
      to: userEmail,
      username: newMember.email.slice(0, newMember.email.indexOf('@')),
      invitedByUsername: user.name,
      invitedByEmail: user.email,
      organizationName: organization.name,
      inviteLink: `${process.env.APP_URL}/auth/login?email=${newMember.email}`,
      inviteFromIp: request.ip ?? '',
      inviteFromLocation: request.hostname,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UpdateOrganizationMembersBody = Partial<{
  membersIds: (User | UserAPI)['id'][];
  adminsIds: (User | UserAPI)['id'][];
}>;
export type UpdateOrganizationMembersResult = ResponseData<OrganizationAPI>;

/**
 * Update members to the organization in the database.
 */
export const updateOrganizationMembers = async (
  request: FastifyRequest<{ Body: UpdateOrganizationMembersBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { organization, roles } = request.session || {};
  const { membersIds, adminsIds } = request.body;

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
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

  if (!membersIds) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'INVALID_REQUEST_BODY'
    );
  }

  if (membersIds?.length === 0) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_MUST_HAVE_MEMBER'
    );
  }

  if (adminsIds?.filter((id) => membersIds?.includes(id)).length === 0) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_MUST_HAVE_ADMIN'
    );
  }

  try {
    const existingUsers = await userService.getUsersByIds(membersIds);

    if (!existingUsers) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const existingAdmins = await userService.getUsersByIds(adminsIds!);

    if (!existingAdmins) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const updatedOrganization =
      await organizationService.updateOrganizationById(organization.id, {
        membersIds: existingUsers.map((user) => user.id),
        adminsIds: existingAdmins.map((user) => user.id),
      });

    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization updated successfully',
        'en-GB': 'Organization updated successfully',
        fr: 'Organisation mise à jour avec succès',
        es: 'Organización actualizada con éxito',
        ru: 'Организация успешно обновлена',
        ja: '組織が正常に更新されました',
        ko: '조직이 성공적으로 업데이트되었습니다',
        zh: '组织已成功更新',
        de: 'Organisation успешно обновлена',
        ar: 'تم تحديث المنظمة بنجاح',
        it: 'Organizzazione aggiornata con successo',
        pt: 'Organização atualizada con sucesso',
        hi: 'संगठन सफलतापूर्वक अपडेट किया गया',
        tr: 'Organizasyon başarıyla güncellendi',
        pl: 'Organizacja została pomyślnie zaktualizowana',
        id: 'Organisasi berhasil diperbarui',
        vi: 'Tổ chức đã được cập nhật thành công',
        uk: 'Організацію успішно оновлено',
      }),
      description: t({
        en: 'Your organization has been updated successfully',
        'en-GB': 'Your organization has been updated successfully',
        fr: 'Votre organisation a été mise à jour avec succès',
        es: 'Su organización ha sido actualizada con éxito',
        ru: 'Ваша организация была успешно обновлена',
        ja: '組織は正常に更新されました',
        ko: '조직이 성공적으로 업데이트되었습니다',
        zh: '您的组织已成功更新',
        de: 'Ihre Organisation wurde erfolgreich aktualisiert',
        ar: 'لقد تم تحديث منظمتك بنجاح',
        it: 'La tua organizzazione è stata aggiornata con successo',
        pt: 'Sua organização foi atualizada com sucesso',
        hi: 'आपका संगठन सफलतापूर्वक अपडेट कर दिया गया है',
        tr: 'Organizasyonunuz başarıyla güncellendi',
        pl: 'Twoja organizacja została pomyślnie zaktualizowana',
        id: 'Organisasi Anda telah berhasil diperbarui',
        vi: 'Tổ chức của bạn đã được cập nhật thành công',
        uk: 'Вашу організацію успішно оновлено',
      }),
      data: mapOrganizationToAPI(updatedOrganization),
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UpdateOrganizationMembersByIdParams = { organizationId: string };
export type UpdateOrganizationMembersByIdBody = Partial<{
  membersIds: (User | UserAPI)['id'][];
  adminsIds: (User | UserAPI)['id'][];
}>;
export type UpdateOrganizationMembersByIdResult = ResponseData<OrganizationAPI>;

/**
 * Admin-only: Update members of any organization by ID
 */
export const updateOrganizationMembersById = async (
  request: FastifyRequest<{
    Params: UpdateOrganizationMembersByIdParams;
    Body: UpdateOrganizationMembersByIdBody;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { user } = request.session || {};
  const { organizationId } = request.params;
  const { membersIds, adminsIds } = request.body;

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (user.role !== 'admin') {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  if (!membersIds) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'INVALID_REQUEST_BODY'
    );
  }

  if (membersIds?.length === 0) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_MUST_HAVE_MEMBER'
    );
  }

  try {
    const targetOrganization =
      await organizationService.getOrganizationById(organizationId);

    if (!targetOrganization) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ORGANIZATION_NOT_FOUND'
      );
    }

    const existingUsers = await userService.getUsersByIds(membersIds);

    if (!existingUsers) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const finalAdminsIds =
      adminsIds && adminsIds.length > 0
        ? adminsIds
        : targetOrganization.adminsIds;
    const existingAdmins = finalAdminsIds
      ? await userService.getUsersByIds(finalAdminsIds)
      : [];

    if (!existingAdmins || existingAdmins.length === 0) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ORGANIZATION_MUST_HAVE_ADMIN'
      );
    }

    const updatedOrganization =
      await organizationService.updateOrganizationById(targetOrganization.id, {
        membersIds: existingUsers.map((user) => user.id),
        adminsIds: existingAdmins.map((user) => user.id),
      });

    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization members updated successfully',
        'en-GB': 'Organization members updated successfully',
        fr: "Membres de l'organisation mis à jour avec succès",
        es: 'Miembros de la organización actualizados con éxito',
        ru: 'Члены организации успешно обновлены',
        ja: '組織メンバーが正常に更新されました',
        ko: '조직 구성원이 성공적으로 업데이트되었습니다',
        zh: '组织成员已成功更新',
        de: 'Organisationsmitglieder erfolgreich aktualisiert',
        ar: 'تم تحديث أعضاء المنظمة بنجاح',
        it: "Membri dell'organizzazione aggiornati con successo",
        pt: 'Membros da organização atualizados com sucesso',
        hi: 'संगठन के सदस्य सफलतापूर्वक अपडेट किए गए',
        tr: 'Organizasyon üyeleri başarıyla güncellendi',
        pl: 'Członkowie organizacji zostali pomyślnie zaktualizowani',
        id: 'Anggota organisasi berhasil diperbarui',
        vi: 'Thành viên tổ chức đã được cập nhật thành công',
        uk: 'Члени організації успішно оновлені',
      }),
      description: t({
        en: 'Organization members have been updated successfully',
        'en-GB': 'Organization members have been updated successfully',
        fr: "Les membres de l'organisation ont été mis à jour avec succès",
        es: 'Los miembros de la organización han sido actualizados con éxito',
        ru: 'Члены организации были успешно обновлены',
        ja: '組織メンバーは正常に更新されました',
        ko: '조직 구성원이 성공적으로 업데이트되었습니다',
        zh: '组织成员已成功更新',
        de: 'Organisationsmitglieder wurden erfolgreich aktualisiert',
        ar: 'لقد تم تحديث أعضاء المنظمة بنجاح',
        it: "I membri dell'organizzazione sono stati aggiornati con successo",
        pt: 'Os membros da organização foram atualizados com sucesso',
        hi: 'संगठन के सदस्यों को सफलतापूर्वक अपडेट किया गया है',
        tr: 'Organizasyon üyeleri başarıyla güncellendi',
        pl: 'Członkowie organizacji zostali pomyślnie zaktualizowani',
        id: 'Anggota organisasi telah berhasil diperbarui',
        vi: 'Thành viên tổ chức đã được cập nhật thành công',
        uk: 'Члени організації успішно оновлені',
      }),
      data: mapOrganizationToAPI(updatedOrganization),
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type DeleteOrganizationResult = ResponseData<OrganizationAPI>;

/**
 * Deletes an organization from the database by its ID.
 */
export const deleteOrganization = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { organization, session, roles, user } = _request.session || {};

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  const projects = await projectService.findProjects({
    organizationId: organization.id,
  });

  if (projects.length > 0) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PROJECTS_EXIST', {
      organizationId: organization.id,
    });
  }

  if (
    !hasPermission(
      roles || [],
      'organization:admin'
    )({
      ..._request.session,
      targetOrganizations: [organization],
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
    // Cancel the subscription on Stripe if it exists
    if (organization.plan?.subscriptionId) {
      await stripe.subscriptions.cancel(organization.plan.subscriptionId);
    }

    const deletedOrganization =
      await organizationService.deleteOrganizationById(organization.id);

    if (!deletedOrganization) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ORGANIZATION_NOT_FOUND',
        {
          organizationId: organization.id,
        }
      );
    }

    // Update session to set activeOrganizationId
    await SessionModel.updateOne(
      { _id: session.id },
      {
        $set: {
          activeOrganizationId: null,
          activeProjectId: null,
        },
      }
    );

    if (user) {
      await userService.updateUserById(user.id, {
        lastActiveOrganizationId: null,
        lastActiveProjectId: null,
      });
    }

    logger.info(`Organization deleted: ${String(deletedOrganization.id)}`);

    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization deleted successfully',
        'en-GB': 'Organization deleted successfully',
        fr: 'Organisation supprimée avec succès',
        es: 'Organización eliminada con éxito',
        ru: 'Организация успешно удалена',
        ja: '組織が正常に削除されました',
        ko: '조직이 성공적으로 삭제되었습니다',
        zh: '组织已成功删除',
        de: 'Organisation erfolgreich gelöscht',
        ar: 'تم حذف المنظمة بنجاح',
        it: 'Organizzazione eliminata con successo',
        pt: 'Organização excluída com sucesso',
        hi: 'संगठन सफलतापूर्वक हटा दिया गया',
        tr: 'Organizasyon başarıyla silindi',
        pl: 'Organizacja została pomyślnie usunięta',
        id: 'Organisasi berhasil dihapus',
        vi: 'Tổ chức đã được xóa thành công',
        uk: 'Організацію успішно видалено',
      }),
      description: t({
        en: 'Your organization has been deleted successfully',
        'en-GB': 'Your organization has been deleted successfully',
        fr: 'Votre organisation a été supprimée avec succès',
        es: 'Su organización ha sido eliminada con éxito',
        ru: 'Ваша организация была успешно удалена',
        ja: '組織は正常に削除されました',
        ko: '조직이 성공적으로 삭제되었습니다',
        zh: '您的组织已成功删除',
        de: 'Ihre Organisation wurde erfolgreich gelöscht',
        ar: 'لقد تم حذف منظمتك بنجاح',
        it: 'La tua organizzazione è stata eliminata con successo',
        pt: 'Sua organização foi excluída com sucesso',
        hi: 'आपका संगठन सफलतापूर्वक हटा दिया गया है',
        tr: 'Organizasyonunuz başarıyla silindi',
        pl: 'Twoja organizacja została pomyślnie usunięta',
        id: 'Organisasi Anda telah berhasil dihapus',
        vi: 'Tổ chức của bạn đã được xóa thành công',
        uk: 'Вашу організацію успішно видалено',
      }),
      data: mapOrganizationToAPI(deletedOrganization),
    });

    // No need to update session here, as it's a delete operation
    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type DeleteOrganizationByIdAdminParams = { organizationId: string };
export type DeleteOrganizationByIdAdminResult = ResponseData<OrganizationAPI>;

/**
 * Admin-only: Deletes any organization from the database by its ID.
 */
export const deleteOrganizationByIdAdmin = async (
  request: FastifyRequest<{ Params: DeleteOrganizationByIdAdminParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { organizationId } = request.params;
  const { roles } = request.session || {};

  if (
    !hasPermission(roles || [], 'organization:admin')({ ...request.session })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const organization =
      await organizationService.getOrganizationById(organizationId);

    if (!organization) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ORGANIZATION_NOT_FOUND'
      );
    }

    const deletedOrganization =
      await organizationService.deleteOrganizationById(organization.id);

    if (!deletedOrganization) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ORGANIZATION_NOT_FOUND'
      );
    }

    const formattedOrganization = mapOrganizationToAPI(deletedOrganization);
    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization deleted',
        fr: 'Organisation supprimée',
        es: 'Organización eliminada',
        'en-GB': 'Organisation deleted',
        de: 'Organisation gelöscht',
        ja: '組織が削除されました',
        ko: '조직이 삭제되었습니다',
        zh: '组织已删除',
        it: 'Organizzazione eliminata',
        pt: 'Organização excluída',
        hi: 'संगठन हटा दिया गया',
        ar: 'تم حذف المنظمة',
        ru: 'Организация удалена',
        tr: 'Organizasyon silindi',
        pl: 'Organizacja usunięta',
        id: 'Organisasi dihapus',
        vi: 'Tổ chức đã bị xóa',
        uk: 'Організацію видалено',
      }),
      data: formattedOrganization,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type SelectOrganizationParam = {
  organizationId: string | Types.ObjectId;
};
export type SelectOrganizationResult = ResponseData<OrganizationAPI>;

/**
 * Select an organization.
 */
export const selectOrganization = async (
  request: FastifyRequest<{ Params: SelectOrganizationParam }>,
  reply: FastifyReply
): Promise<void> => {
  const { organizationId } = request.params;
  const { session, roles, user } = request.session || {};

  if (!organizationId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_ID_NOT_FOUND'
    );
  }

  if (typeof session === 'undefined') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SESSION_NOT_DEFINED'
    );
  }

  try {
    const organization =
      await organizationService.getOrganizationById(organizationId);

    if (
      !hasPermission(
        roles || [],
        'organization:read'
      )({
        ...request.session,
        targetOrganizations: [organization],
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    // Update session to set activeOrganizationId
    await SessionModel.updateOne(
      { _id: session.id },
      {
        $set: {
          activeOrganizationId: String(organization.id),
          activeProjectId: null,
        },
      }
    );

    if (user) {
      await userService.updateUserById(user.id, {
        lastActiveOrganizationId: String(organization.id),
        lastActiveProjectId: null,
      });
    }

    // No need to update session here, as it's a select operation
    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization retrieved successfully',
        'en-GB': 'Organization retrieved successfully',
        fr: 'Organisation récupérée avec succès',
        es: 'Organización recuperada con éxito',
        ru: 'Организация успешно получена',
        ja: '組織が正常に取得されました',
        ko: '조직이 성공적으로 검색되었습니다',
        zh: '组织已成功检索',
        de: 'Organisation erfolgreich abgerufen',
        ar: 'تم استرداد المنظمة بنجاح',
        it: 'Organizzazione recuperata con successo',
        pt: 'Organização recuperada com sucesso',
        hi: 'संगठन सफलतापूर्वक प्राप्त किया गया',
        tr: 'Organizasyon başarıyla alındı',
        pl: 'Organizacja została pomyślnie pobrana',
        id: 'Organisasi berhasil diambil',
        vi: 'Tổ chức đã được truy xuất thành công',
        uk: 'Організацію успішно отримано',
      }),
      description: t({
        en: 'Your organization has been retrieved successfully',
        'en-GB': 'Your organization has been retrieved successfully',
        fr: 'Votre organisation a été récupérée avec succès',
        es: 'Su organización ha sido recuperada con éxito',
        ru: 'Ваша организация была успешно получена',
        ja: '組織は正常に取得されました',
        ko: '조직이 성공적으로 검색되었습니다',
        zh: '您的组织已成功检索',
        de: 'Ihre Organisation wurde erfolgreich abgerufen',
        ar: 'لقد تم استرداد منظمتك بنجاح',
        it: 'La tua organizzazione è stata recuperata con successo',
        pt: 'Sua organização foi recuperada com sucesso',
        hi: 'आपका संगठन सफलतापूर्वक प्राप्त कर लिया गया है',
        tr: 'Organizasyonunuz başarıyla alındı',
        pl: 'Twoja organizacja została pomyślnie pobrana',
        id: 'Organisasi Anda telah berhasil diambil',
        vi: 'Tổ chức của bạn đã được truy xuất thành công',
        uk: 'Вашу організацію успішно отримано',
      }),
      data: mapOrganizationToAPI(organization),
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UnselectOrganizationResult = ResponseData<null>;

/**
 * Unselect an organization.
 */
export const unselectOrganization = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { session, user } = _request.session || {};
  try {
    // Update session to clear activeOrganizationId and activeProjectId

    if (typeof session === 'undefined') {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'SESSION_NOT_DEFINED'
      );
    }

    await SessionModel.updateOne(
      { _id: session.id },
      {
        $set: {
          activeOrganizationId: null,
          activeProjectId: null,
        },
      }
    );

    if (user) {
      await userService.updateUserById(user.id, {
        lastActiveOrganizationId: null,
        lastActiveProjectId: null,
      });
    }

    const responseData = formatResponse<null>({
      message: t({
        en: 'Organization unselected successfully',
        'en-GB': 'Organization unselected successfully',
        fr: 'Organisation désélectionnée avec succès',
        es: 'Organización deseleccionada con éxito',
        ru: 'Организация успешно снята с выбора',
        ja: '組織の選択が正常に解除されました',
        ko: '조직 선택이 성공적으로 해제되었습니다',
        zh: '组织已成功取消选择',
        de: 'Organisation erfolgreich abgewählt',
        ar: 'تم إلغاء تحديد المنظمة بنجاح',
        it: 'Organizzazione deselezionata con successo',
        pt: 'Organização desmarcada com sucesso',
        hi: 'संगठन सफलतापूर्वक अनसेलेक्ट किया गया',
        tr: 'Organizasyon seçimi başarıyla kaldırıldı',
        pl: 'Wybór organizacji został pomyślnie cofnięty',
        id: 'Organisasi berhasil batal dipilih',
        vi: 'Tổ chức đã được bỏ chọn thành công',
        uk: 'Вибір організації успішно скасовано',
      }),
      description: t({
        en: 'Your organization has been unselected successfully',
        'en-GB': 'Your organization has been unselected successfully',
        fr: 'Votre organisation a été désélectionnée avec succès',
        es: 'Su organización ha sido deseleccionada con éxito',
        ru: 'Выбор вашей организации был успешно снят',
        ja: '組織の選択は正常に解除されました',
        ko: '조직 선택이 성공적으로 해제되었습니다',
        zh: '您的组织已成功取消选择',
        de: 'Ihre Organisation wurde erfolgreich abgewählt',
        ar: 'لقد تم إلغاء تحديد منظمتك بنجاح',
        it: 'La tua organizzazione è stata deselezionata con successo',
        pt: 'Sua organização foi desmarcada com sucesso',
        hi: 'आपका संगठन सफलतापूर्वक अनसेलेक्ट कर दिया गया है',
        tr: 'Organizasyonunuzun seçimi başarıyla kaldırıldı',
        pl: 'Wybór Twojej organizacji został pomyślnie cofnięty',
        id: 'Organisasi Anda telah berhasil batal dipilih',
        vi: 'Tổ chức của bạn đã được bỏ chọn thành công',
        uk: 'Вибір вашої організації успішно скасовано',
      }),
      data: null,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
