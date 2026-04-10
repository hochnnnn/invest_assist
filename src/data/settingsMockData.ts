import { ReferralConfig, SubscriptionPlan } from "../types";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "starter",
    nameKey: "subscription.starter.name",
    priceLabelKey: "subscription.starter.price",
    featureKeys: [
      "subscription.starter.feature.watchlist",
      "subscription.starter.feature.overview",
    ],
    isCurrent: true,
  },
  {
    id: "pro",
    nameKey: "subscription.pro.name",
    priceLabelKey: "subscription.pro.price",
    featureKeys: [
      "subscription.pro.feature.signals",
      "subscription.pro.feature.alerts",
    ],
  },
  {
    id: "elite",
    nameKey: "subscription.elite.name",
    priceLabelKey: "subscription.elite.price",
    featureKeys: [
      "subscription.elite.feature.workspace",
      "subscription.elite.feature.review",
    ],
  },
];

export const referralConfig: ReferralConfig = {
  shareUrl: "https://example.com/invite?ref=demo-user",
  rewardTextKey: "settings.referral.reward",
};
