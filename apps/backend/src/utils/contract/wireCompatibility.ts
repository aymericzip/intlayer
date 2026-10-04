/**
 * Compile-time drift checks between the backend (mongoose) types and the
 * contract (zod) wire types: `bun run typecheck` fails, naming the fields,
 * when a serialized backend entity no longer satisfies its contract.
 */

import type { AIOptions } from '@intlayer/ai';
import type {
  AIOptions as ContractAIOptions,
  AIStats as ContractAIStats,
  DiscussionAPI as ContractDiscussionAPI,
} from '@intlayer/backend-contract/ai';
import type { AudienceStats as ContractAudienceStats } from '@intlayer/backend-contract/analytics';
import type { AssetAPI as ContractAssetAPI } from '@intlayer/backend-contract/asset';
import type { BlogCommentAPI as ContractBlogCommentAPI } from '@intlayer/backend-contract/blogComment';
import type { DictionaryAPI as ContractDictionaryAPI } from '@intlayer/backend-contract/dictionary';
import type {
  BitbucketRepository as ContractBitbucketRepository,
  GitHubRepository as ContractGitHubRepository,
  GitLabProject as ContractGitLabProject,
} from '@intlayer/backend-contract/gitProviders';
import type {
  OrganizationAPI as ContractOrganizationAPI,
  PlanAPI as ContractPlanAPI,
} from '@intlayer/backend-contract/organization';
import type {
  EnvironmentAPI as ContractEnvironmentAPI,
  OAuth2AccessAPI as ContractOAuth2AccessAPI,
  ProjectAPI as ContractProjectAPI,
  ProjectInsights as ContractProjectInsights,
  ProjectMemberGranularAccessAPI as ContractProjectMemberGranularAccessAPI,
} from '@intlayer/backend-contract/project';
import type {
  ReviewerMessageAPI as ContractReviewerMessageAPI,
  ReviewerProfileAPI as ContractReviewerProfileAPI,
  ReviewerReviewAPI as ContractReviewerReviewAPI,
  TranslationMissionAPI as ContractTranslationMissionAPI,
} from '@intlayer/backend-contract/reviewer';
import type {
  HostScan as ContractHostScan,
  RoutingStrategy as ContractRoutingStrategy,
  ScannedHostDetail as ContractScannedHostDetail,
  TechnologyCategory as ContractTechnologyCategory,
  TechnologyUsage as ContractTechnologyUsage,
} from '@intlayer/backend-contract/scan';
import type { ShowcaseProjectAPI as ContractShowcaseProjectAPI } from '@intlayer/backend-contract/showcaseProject';
import type {
  AffiliateAPI as ContractAffiliateAPI,
  AffiliateInvitationAPI as ContractAffiliateInvitationAPI,
  AffiliateStats as ContractAffiliateStats,
  PricingResult as ContractPricingResult,
  PromoCodeAPI as ContractPromoCodeAPI,
} from '@intlayer/backend-contract/stripe';
import type { TagAPI as ContractTagAPI } from '@intlayer/backend-contract/tag';
import type { UserAPI as ContractUserAPI } from '@intlayer/backend-contract/user';
import type {
  RoutingStrategy,
  TechnologyCategory,
} from '@intlayer/engine/scan/detection';
import type { HostScan } from '@schemas/scannedHost.schema';
import type {
  ScannedHostDetail,
  TechnologyUsage,
} from '@services/audit/scannedHost.service';
import type { BitbucketRepository } from '@services/bitbucket.service';
import type { GitHubRepository } from '@services/github.service';
import type { GitLabProject } from '@services/gitlab.service';
import type { PricingResult } from '@services/subscription.service';
import type { AffiliateAPI, AffiliateStats } from '@/types/affiliate.types';
import type { AffiliateInvitationAPI } from '@/types/affiliateInvitation.types';
import type { AIStats } from '@/types/aiStats.types';
import type { AudienceStats } from '@/types/analytics.types';
import type { AssetAPI } from '@/types/asset.types';
import type { BlogCommentAPI } from '@/types/blogComment.types';
import type { DictionaryAPI } from '@/types/dictionary.types';
import type { DiscussionAPI } from '@/types/discussion.types';
import type { OrganizationAPI } from '@/types/organization.types';
import type { PlanAPI } from '@/types/plan.types';
import type {
  EnvironmentAPI,
  OAuth2AccessAPI,
  ProjectAPI,
  ProjectMemberGranularAccessAPI,
} from '@/types/project.types';
import type { ProjectInsights } from '@/types/projectInsights.types';
import type { PromoCodeAPI } from '@/types/promoCode.types';
import type {
  ReviewerMessageAPI,
  ReviewerProfileAPI,
  ReviewerReviewAPI,
  TranslationMissionAPI,
} from '@/types/reviewer.types';
import type { ShowcaseProjectAPI } from '@/types/showcaseProject.types';
import type { TagAPI } from '@/types/tag.types';
import type { UserAPI } from '@/types/user.types';
import type { AssertWire, Serialized } from './wireTypes';

/** `Omit` applied to each member of a union (keeps the discriminant). */
type DistributiveOmit<Value, Key extends PropertyKey> = Value extends unknown
  ? Omit<Value, Key>
  : never;

/** Credentials stripped by `mapProjectToAPI` before sending. */
type SentAccessKey = Omit<OAuth2AccessAPI, 'accessToken'>;
type SentProject = Omit<ProjectAPI, 'oAuth2Access' | 'repository'> & {
  oAuth2Access: SentAccessKey[];
  repository?: DistributiveOmit<NonNullable<ProjectAPI['repository']>, 'token'>;
};

export type WireCompatibility = [
  AssertWire<ContractProjectAPI, Serialized<SentProject>>,
  AssertWire<ContractOAuth2AccessAPI, Serialized<SentAccessKey>>,
  AssertWire<ContractEnvironmentAPI, Serialized<EnvironmentAPI>>,
  AssertWire<
    ContractProjectMemberGranularAccessAPI,
    Serialized<ProjectMemberGranularAccessAPI>
  >,
  AssertWire<ContractProjectInsights, Serialized<ProjectInsights>>,
  AssertWire<ContractTagAPI, Serialized<TagAPI>>,
  AssertWire<ContractUserAPI, Serialized<UserAPI>>,
  AssertWire<ContractShowcaseProjectAPI, Serialized<ShowcaseProjectAPI>>,
  AssertWire<ContractBlogCommentAPI, Serialized<BlogCommentAPI>>,
  AssertWire<ContractOrganizationAPI, Serialized<OrganizationAPI>>,
  AssertWire<ContractPlanAPI, Serialized<PlanAPI>>,
  AssertWire<ContractDictionaryAPI, Serialized<DictionaryAPI>>,
  AssertWire<ContractAssetAPI, Serialized<AssetAPI>>,
  AssertWire<ContractAudienceStats, Serialized<AudienceStats>>,
  AssertWire<ContractHostScan, Serialized<HostScan>>,
  AssertWire<ContractScannedHostDetail, Serialized<ScannedHostDetail>>,
  AssertWire<ContractTechnologyUsage, Serialized<TechnologyUsage>>,
  // Clients pass `@intlayer/ai` options as-is
  AssertWire<ContractAIOptions, AIOptions>,
  AssertWire<ContractDiscussionAPI, Serialized<DiscussionAPI>>,
  AssertWire<ContractAIStats, Serialized<AIStats>>,
  AssertWire<ContractGitHubRepository, Serialized<GitHubRepository>>,
  AssertWire<ContractGitLabProject, Serialized<GitLabProject>>,
  AssertWire<ContractBitbucketRepository, Serialized<BitbucketRepository>>,
  AssertWire<
    ContractReviewerProfileAPI,
    Serialized<Omit<ReviewerProfileAPI, 'stripeAccountId'>>
  >,
  AssertWire<ContractTranslationMissionAPI, Serialized<TranslationMissionAPI>>,
  AssertWire<ContractReviewerReviewAPI, Serialized<ReviewerReviewAPI>>,
  AssertWire<ContractReviewerMessageAPI, Serialized<ReviewerMessageAPI>>,
  AssertWire<ContractAffiliateAPI, Serialized<AffiliateAPI>>,
  AssertWire<ContractAffiliateStats, Serialized<AffiliateStats>>,
  AssertWire<
    ContractAffiliateInvitationAPI,
    Serialized<AffiliateInvitationAPI>
  >,
  AssertWire<ContractPromoCodeAPI, Serialized<PromoCodeAPI>>,
  AssertWire<ContractPricingResult, Serialized<PricingResult>>,
  // The scan vocabulary is owned by engine; the contract mirrors it
  // (asserted both directions: the unions must be identical)
  AssertWire<ContractRoutingStrategy, RoutingStrategy>,
  AssertWire<RoutingStrategy, ContractRoutingStrategy>,
  AssertWire<ContractTechnologyCategory, TechnologyCategory>,
  AssertWire<TechnologyCategory, ContractTechnologyCategory>,
];
