import {
    END_PARENTHESES_PAIR,
    SPACE_END_PARENTHESES_PAIR,
} from '@/constants/regex';

// Get matching end-parenthesis
export const getParensMatch = (
    str: string,
): { hasBrace: boolean; braced: string; raw: number } => {
    const matches = str.match(END_PARENTHESES_PAIR);

    return {
        hasBrace: Boolean(matches),
        braced: matches ? matches[0] : '', // the string (4) => (4)
        raw: matches ? Number(matches[1]) : 0, // the string (4) => 4
    };
};

// Get the highest (N) among all siblings
export const getHighestDuplicateNum = (
    nextTitle: string,
    siblingTitles: string[],
) =>
    siblingTitles.reduce((prev, title) => {
        const strippedTitleParens = nextTitle.replace(
            SPACE_END_PARENTHESES_PAIR,
            '',
        );
        const SAME_TITLE_WITH_PARENS = `^(?:${strippedTitleParens}) [(]([0-9]+?)[)]$`;
        const PATTERN = new RegExp(SAME_TITLE_WITH_PARENS);

        const match = title.match(PATTERN);

        if (match) {
            const currentNum = Number(match[1]);

            if (isNaN(currentNum)) return prev;

            return Math.max(currentNum, prev);
        }

        return prev;
    }, 0);

export const incrementDuplicateCount = (
    nextTitle: string,
    siblingTitles: string[],
): string => {
    if (siblingTitles.includes(nextTitle)) {
        const highestNum = getHighestDuplicateNum(nextTitle, siblingTitles);
        const { braced } = getParensMatch(nextTitle);

        return nextTitle.replace(braced, `(${highestNum + 1})`);
    }

    return nextTitle;
};
