import plugin from 'tailwindcss/plugin'

export default plugin(({ addVariant }) => {
    addVariant('not-first', '&:not(:first-child)')
    addVariant('not-last', '&:not(:last-child)')
})
