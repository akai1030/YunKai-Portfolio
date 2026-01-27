import { setup, assign } from 'xstate'

export const introMachine = setup({
    types: {
        context: {} as {},
        events: {} as
            | { type: 'START_RAIN' }
            | { type: 'INTENSIFY_RAIN' }
            | { type: 'BLACKOUT' }
            | { type: 'FINISH_INTRO' }
    }
}).createMachine({
    id: 'intro',
    initial: 'idle',
    context: {},
    states: {
        idle: {
            on: { START_RAIN: 'raining' }
        },
        raining: {
            on: { INTENSIFY_RAIN: 'storm' }
        },
        storm: {
            on: { BLACKOUT: 'blackout' }
        },
        blackout: {
            after: {
                1500: 'complete' // "Click" sound effect timing
            }
        },
        complete: {
            type: 'final'
        }
    }
})
