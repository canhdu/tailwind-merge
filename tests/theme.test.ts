import { expect, test } from 'vitest'

import { extendTailwindMerge, fromTheme } from '../src'

test('theme scale can be extended', () => {
    const tailwindMerge = extendTailwindMerge({
        extend: {
            theme: {
                spacing: ['my-space'],
                leading: ['my-leading'],
            },
        },
    })

    expect(tailwindMerge('p-3 p-my-space p-my-margin')).toBe('p-my-space p-my-margin')
    expect(tailwindMerge('leading-3 leading-my-space leading-my-leading')).toBe(
        'leading-my-leading',
    )
})

test('theme object can be extended', () => {
    const tailwindMerge = extendTailwindMerge<never, string>({
        extend: {
            theme: {
                'my-theme': ['hallo', 'hello'],
            },
            classGroups: {
                px: [{ px: [fromTheme<string>('my-theme')] }],
            },
        },
    })

    expect(tailwindMerge('p-3 p-hello p-hallo')).toBe('p-3 p-hello p-hallo')
    expect(tailwindMerge('px-3 px-hello px-hallo')).toBe('px-hallo')
})
