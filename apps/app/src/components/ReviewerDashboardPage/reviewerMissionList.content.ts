import { type Dictionary, t } from 'intlayer';

const reviewerMissionListContent = {
  key: 'reviewer-mission-list',
  content: {
    noMissionsYet: t({
      en: "No missions yet."
    }),

    acceptMission: t({
      en: "Accept mission"
    }),

    accept: t({
      en: "Accept"
    }),

    declineMission: t({
      en: "Decline mission"
    }),

    decline: t({
      en: "Decline"
    }),

    startMission: t({
      en: "Start mission"
    }),

    start: t({
      en: "Start"
    }),

    markMissionAsDone: t({
      en: "Mark mission as done"
    }),

    markDone: t({
      en: "Mark done"
    }),

    openMissionChat: t({
      en: "Open mission chat"
    })
  },
} satisfies Dictionary;

export default reviewerMissionListContent;
