// match: "some text (4)" => "(4)"
export const END_PARENTHESES_PAIR = /\((\d+?)\)$/;

// match: "some text (4)" => " (4)"
export const SPACE_END_PARENTHESES_PAIR = /\s\((\d+?)\)$/;
