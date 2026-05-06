import type { WeeklyReview } from "@/types";
import { daysAgoISO } from "@/lib/date";

export const weeklyReviews: WeeklyReview[] = [
  {
    id: "wr_005",
    weekStart: daysAgoISO(7),
    wentWell:
      "Stayed off my phone for the first hour each morning, all five weekdays. Ran three times.",
    wentWrong:
      "Skipped journaling on the weekend. Ate poorly Saturday and felt it Sunday.",
    learned:
      "The phone in another room is the entire trick. Everything else is downstream.",
    hardestHabit: "Sleep before midnight on Friday — failed twice.",
    proudOf: "Called dad with no reason on Wednesday. He sounded happy.",
    improveNextWeek:
      "Plan weekend meals on Friday so Saturday isn't a willpower test.",
    nextWeekFocus: "Ship the Habits page. Long run on Saturday.",
  },
  {
    id: "wr_004",
    weekStart: daysAgoISO(14),
    wentWell: "Finished a book. Reread the parts I'd nodded at without absorbing.",
    wentWrong:
      "Two days of low mood after a stressful Tuesday. Didn't write through it.",
    learned: "Writing through hard days makes them shorter, not longer.",
    hardestHabit: "Avoid mindless scrolling — broke twice on Sunday evening.",
    proudOf: "Said no to a Saturday work request.",
    improveNextWeek: "Catch the spiral earlier. Walk before scrolling.",
    nextWeekFocus: "Deep work mornings, real food, run three times.",
  },
  {
    id: "wr_003",
    weekStart: daysAgoISO(21),
    wentWell: "Sent the email I'd been putting off for a month.",
    wentWrong: "Slept badly all week. Stayed up too late on calls.",
    learned: "I underestimate sleep debt by half. The numbers here don't lie.",
    hardestHabit: "Sleep before midnight.",
    proudOf: "Apologized properly. No qualifications.",
    improveNextWeek: "Calendar block bedtime like a meeting.",
    nextWeekFocus: "Sleep. Sleep. Sleep.",
  },
  {
    id: "wr_002",
    weekStart: daysAgoISO(28),
    wentWell: "Five mornings of journaling. Two long walks.",
    wentWrong: "Talked too much in a meeting where I should have listened.",
    learned: "When I'm uncertain, I fill silence with words. The silence was the answer.",
    hardestHabit: "Practice a skill — only twice this week.",
    proudOf: "Cooked Sunday dinner for friends. Phone in another room.",
    improveNextWeek: "One real piano session before work, three days.",
    nextWeekFocus: "Less talking. More making.",
  },
  {
    id: "wr_001",
    weekStart: daysAgoISO(35),
    wentWell: "Started the dashboard project. Sketched three real pages.",
    wentWrong: "Got pulled into a comparison spiral after a friend's launch.",
    learned: "Their timeline is not my timeline. The comparison is a tax.",
    hardestHabit: "No mindless scrolling — broke after the spiral.",
    proudOf: "Closed the apps. Went for a walk. Came back to the work.",
    improveNextWeek: "Notice the spiral two seconds earlier each time.",
    nextWeekFocus: "Build the design system. Pick the MVP scope.",
  },
];
