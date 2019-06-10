
export const minLength = min => value =>
value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minLength6 = minLength(6)

export const required = value => ( value ? undefined : 'Cette entrée est obligatoire')