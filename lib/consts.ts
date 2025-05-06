export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/gm);
export const PASSWORD_REGEX_ERROR = `패스워드는 반드시 대문자, 소문자, 숫자, 특수기호가 포함된 ${PASSWORD_MIN_LENGTH}자 이상이여야 합니다.`;

export const TWEET_PAGE_SIZE = 4;
