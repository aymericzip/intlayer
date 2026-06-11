import * as blogCommentService from '@services/blogComment.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import {
  formatPaginatedResponse,
  formatResponse,
  type ResponseData,
} from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import type {
  BlogCommentAPI,
  BlogCommentPublicAPI,
  BlogCommentStatus,
} from '@/types/blogComment.types';

export type SubmitBlogCommentBody = {
  blogSlug: string;
  authorName: string;
  authorEmail: string;
  content: string;
};

export type UpdateBlogCommentStatusBody = {
  status: BlogCommentStatus;
};

export type SubmitBlogCommentResult = ResponseData<BlogCommentPublicAPI>;
export type GetBlogCommentsResult = ResponseData<BlogCommentPublicAPI[]>;
export type GetAdminBlogCommentsResult = ResponseData<BlogCommentAPI[]>;
export type UpdateBlogCommentStatusResult = ResponseData<BlogCommentAPI>;

/**
 * Public — submits a comment for a blog post (stored as "pending").
 */
export const submitBlogComment = async (
  request: FastifyRequest<{ Body: SubmitBlogCommentBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { blogSlug, authorName, authorEmail, content } = request.body;

  if (!blogSlug || !authorName || !authorEmail || !content) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'BLOG_COMMENT_INVALID_DATA'
    );
  }

  try {
    const comment = await blogCommentService.createBlogComment({
      blogSlug,
      authorName,
      authorEmail,
      content,
    });

    const { authorEmail: _email, ...publicComment } =
      comment.toJSON() as BlogCommentAPI;

    const responseData = formatResponse<BlogCommentPublicAPI>({
      message: t({
        en: 'Comment submitted for review',
        fr: 'Commentaire soumis pour modération',
        es: 'Comentario enviado para revisión',
        de: 'Kommentar zur Überprüfung eingereicht',
        ja: 'コメントが審査のために送信されました',
        ko: '댓글이 검토를 위해 제출되었습니다',
        zh: '评论已提交审核',
        ru: 'Комментарий отправлен на проверку',
        pt: 'Comentário enviado para revisão',
        it: 'Commento inviato per revisione',
        ar: 'تم إرسال التعليق للمراجعة',
        hi: 'टिप्पणी समीक्षा के लिए जमा की गई',
        tr: 'Yorum inceleme için gönderildi',
        pl: 'Komentarz przesłany do recenzji',
        id: 'Komentar dikirim untuk ditinjau',
        vi: 'Bình luận đã được gửi để xem xét',
        uk: 'Коментар надіслано на перевірку',
      }),
      data: publicComment,
    });

    return reply.status(201).send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Public — returns approved comments for a blog slug.
 */
export const getApprovedBlogComments = async (
  request: FastifyRequest<{ Params: { blogSlug: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { blogSlug } = request.params;

  try {
    const comments =
      await blogCommentService.getApprovedCommentsBySlug(blogSlug);

    const publicComments = comments.map(
      (comment): BlogCommentPublicAPI =>
        (({ authorEmail: _email, ...rest }) => rest)(
          (comment as unknown as { toJSON(): BlogCommentAPI }).toJSON()
        )
    );

    const responseData = formatResponse<BlogCommentPublicAPI[]>({
      data: publicComments,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Admin — returns paginated comments with optional status/slug filters.
 */
export const getAdminBlogComments = async (
  request: FastifyRequest<{
    Querystring: {
      blogSlug?: string;
      status?: BlogCommentStatus;
      page?: string;
      pageSize?: string;
    };
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { roles } = request.session || {};

  if (!roles?.includes('admin')) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const { blogSlug, status, page, pageSize } = request.query;

  try {
    const result = await blogCommentService.findBlogComments({
      blogSlug,
      status,
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 20,
    });

    const responseData = formatPaginatedResponse<BlogCommentAPI>({
      data: result.data.map((c) =>
        (c as unknown as { toJSON(): BlogCommentAPI }).toJSON()
      ),
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 20,
      totalPages: result.totalPages,
      totalItems: result.totalItems,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Admin — updates the moderation status of a comment (approve / reject).
 */
export const updateBlogCommentStatus = async (
  request: FastifyRequest<{
    Params: { commentId: string };
    Body: UpdateBlogCommentStatusBody;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { roles } = request.session || {};

  if (!roles?.includes('admin')) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const { commentId } = request.params;
  const { status } = request.body;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'BLOG_COMMENT_INVALID_STATUS'
    );
  }

  try {
    const comment = await blogCommentService.updateBlogCommentStatus(
      commentId,
      status
    );

    const responseData = formatResponse<BlogCommentAPI>({
      message: t({
        en: `Comment ${status}`,
        fr: `Commentaire ${status === 'approved' ? 'approuvé' : status === 'rejected' ? 'rejeté' : 'en attente'}`,
        es: `Comentario ${status === 'approved' ? 'aprobado' : status === 'rejected' ? 'rechazado' : 'pendiente'}`,
        de: `Kommentar ${status === 'approved' ? 'genehmigt' : status === 'rejected' ? 'abgelehnt' : 'ausstehend'}`,
        ja: `コメントが${status === 'approved' ? '承認' : status === 'rejected' ? '拒否' : '保留'}されました`,
        ko: `댓글이 ${status === 'approved' ? '승인' : status === 'rejected' ? '거부' : '보류'}되었습니다`,
        zh: `评论已${status === 'approved' ? '批准' : status === 'rejected' ? '拒绝' : '待处理'}`,
        ru: `Комментарий ${status === 'approved' ? 'одобрен' : status === 'rejected' ? 'отклонён' : 'ожидает'}`,
        pt: `Comentário ${status === 'approved' ? 'aprovado' : status === 'rejected' ? 'rejeitado' : 'pendente'}`,
        it: `Commento ${status === 'approved' ? 'approvato' : status === 'rejected' ? 'rifiutato' : 'in attesa'}`,
        ar: `${status === 'approved' ? 'تمت الموافقة على' : status === 'rejected' ? 'تم رفض' : 'في انتظار'} التعليق`,
        hi: `टिप्पणी ${status === 'approved' ? 'स्वीकृत' : status === 'rejected' ? 'अस्वीकृत' : 'लंबित'} हुई`,
        tr: `Yorum ${status === 'approved' ? 'onaylandı' : status === 'rejected' ? 'reddedildi' : 'beklemede'}`,
        pl: `Komentarz ${status === 'approved' ? 'zatwierdzony' : status === 'rejected' ? 'odrzucony' : 'oczekujący'}`,
        id: `Komentar ${status === 'approved' ? 'disetujui' : status === 'rejected' ? 'ditolak' : 'tertunda'}`,
        vi: `Bình luận ${status === 'approved' ? 'đã được phê duyệt' : status === 'rejected' ? 'đã bị từ chối' : 'đang chờ xử lý'}`,
        uk: `Коментар ${status === 'approved' ? 'схвалено' : status === 'rejected' ? 'відхилено' : 'очікує'}`,
      }),
      data: (comment as unknown as { toJSON(): BlogCommentAPI }).toJSON(),
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Admin — permanently deletes a comment.
 */
export const deleteBlogComment = async (
  request: FastifyRequest<{ Params: { commentId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { roles } = request.session || {};

  if (!roles?.includes('admin')) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const { commentId } = request.params;

  try {
    await blogCommentService.deleteBlogComment(commentId);

    const responseData = formatResponse<null>({
      message: t({
        en: 'Comment deleted',
        fr: 'Commentaire supprimé',
        es: 'Comentario eliminado',
        de: 'Kommentar gelöscht',
        ja: 'コメントが削除されました',
        ko: '댓글이 삭제되었습니다',
        zh: '评论已删除',
        ru: 'Комментарий удалён',
        pt: 'Comentário excluído',
        it: 'Commento eliminato',
        ar: 'تم حذف التعليق',
        hi: 'टिप्पणी हटाई गई',
        tr: 'Yorum silindi',
        pl: 'Komentarz usunięty',
        id: 'Komentar dihapus',
        vi: 'Bình luận đã bị xóa',
        uk: 'Коментар видалено',
      }),
      data: null,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
