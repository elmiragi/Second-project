import type { AnswerValue, CheckResult, Question } from "../components/types/testing"


export function checkQuestion(question: Question, answer: AnswerValue): CheckResult {
    if (!answer || !answer.value) {
        return {
            max: question.score,
            score: 0,
        };
    }
    if (!question.correct) {
        return {
            max: question.score,
            score: 0,
        };
    }
    if (question.type==='text') {
        return {
        max: question.score,
        score: 0,
        };
    }
    if (question.type === 'single') {
        const ok = answer.value === question.correct;
        return {
            max: question.score,
            score: ok ? question.score : 0,
            status: ok ? 'correct' : 'warning',
        };
    }
    if (question.type === 'multiple') {
        const userResponses = Array.isArray(answer.value) ? answer.value : [];
        const correctResponses = Array.isArray(question.correct) ? question.correct : [];
        console.log('userResponses, correctResponses', userResponses, correctResponses)
        // const correctCount = userResponses.filter(cor => 
        //     correctResponses.includes(cor)
        // )
        const correctCount = userResponses.filter(v => correctResponses.includes(v)).length;
        const wrongCount = userResponses.filter(v => !correctResponses.includes(v)).length;

        console.log('correctCount', correctCount);
        console.log('wrongCount', wrongCount)
        if (wrongCount > 0) {
            return {
                max: question.score,
                score: correctCount,
                status: 'wrong',
            };
        }
        // if (correctCount === correctResponses.length) {
        if (correctCount > 0) {
            return {
                max: question.score,
                score: correctCount,
                status: 'correct',
            };
        }
        console.log('correctCount.length', correctCount)
        console.log('correctResponses.length', correctResponses.length)
        console.log((correctCount/correctResponses.length)*question.score)
        // return {
        //     max: question.score,
        //     answer: ok ? question.score : 0,
        //     status: ok ? 'correct' : 'warning',
        // };
    }
    return {
        max: question.score,
        score: 0,
        };
}