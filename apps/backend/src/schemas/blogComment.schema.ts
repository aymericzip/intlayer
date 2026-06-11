import type { RenameId } from '@utils/mongoDB/types';
import { type Model, model, Schema } from 'mongoose';
import type { BlogComment, BlogCommentSchema } from '@/types/blogComment.types';

export const blogCommentSchema = new Schema<BlogCommentSchema>(
  {
    blogSlug: {
      type: String,
      required: true,
      index: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    authorEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true,
    },
  },
  {
    timestamps: true,

    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_doc, ret: Record<string, unknown>) {
        const { _id, ...rest } = ret;
        return { ...rest, id: (_id as { toString(): string }).toString() };
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc, ret: Record<string, unknown>) {
        const { _id, ...rest } = ret;
        return { ...rest, id: _id };
      },
    },
  }
);

export const BlogCommentModel = model<
  RenameId<BlogComment>,
  Model<BlogComment>
>('blogComment', blogCommentSchema);
