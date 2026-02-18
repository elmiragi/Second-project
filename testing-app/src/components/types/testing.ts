export type Attempt = {
    id: number;
    testId: number;
    userId: number;
    score: number;
    status: "submitted" | "graded" | "in-progress";
    finishedAt: string;
    startedAt: string;
    timeSpent: number;
}
export type TestMeta = {
    project: string;
    course: string;
    purpose: string;
    track: string;
}
export type TestItem = {
    id: number;
    title: string;
    description: string;
    passScore: number;
    isPublished: boolean;
    durationSec: number;
    attemptsAllowed: number;
    allowRetry: boolean;
    repeatIsAllowed: boolean;
    passingScore: number;
    tags: string[];
    deadlineISO: string;
    meta: TestMeta;
    attempts: Attempt[];
}

export type QuestionType = 'text' | 'multiple' | 'single';

export type Question = {
  id: number,
  testId: number,
  type: QuestionType,
  text: string,
  options?: string[];
  correct?: string;
  score: number;
  shuffle?: boolean;

}