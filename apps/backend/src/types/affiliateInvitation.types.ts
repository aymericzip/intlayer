import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import type { AffiliateCategory, CommissionType } from './affiliate.types';
import type { User } from './user.types';

export type AffiliateInvitationStatus = 'pending' | 'accepted' | 'expired';

export type AffiliateInvitationData = {
  email: string;
  token: string;
  status: AffiliateInvitationStatus;
  invitedBy: User['id'];
  commissionRate: number;
  commissionType: CommissionType;
  country?: string;
  category?: AffiliateCategory;
  expiresAt: Date;
};

export type AffiliateInvitation = AffiliateInvitationData & {
  id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type AffiliateInvitationAPI = ObjectIdToString<AffiliateInvitation>;
export type AffiliateInvitationSchema = RenameId<AffiliateInvitation>;
export type AffiliateInvitationModelType = Model<AffiliateInvitation>;
export type AffiliateInvitationDocument = Document<
  unknown,
  {},
  AffiliateInvitation
> &
  AffiliateInvitation;
