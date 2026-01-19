export type Attempt = {
    id: number;
    testId: number;
    userId: number;
    score: number;
    status: "submitted" | "graded" | "in-progress";
}
export type TestMeta = {
    project: string;
    course: string;
    vector: string;
    verification: string;
    attempts: Attempt[];
}
export type TestItem = {
    id: number;
    title: string;
    description: string;
    repeatIsAllowed: boolean;
    passingScore: number;
    meta: TestMeta[];
    attempts: Attempt[];
}