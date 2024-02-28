import { expect, browser } from '@wdio/globals'

describe('scriptBlocking', () => {
    before(async () => {
        await browser.throttleCPU(4)
        await browser.throttleNetwork('Good 3G')
        await browser.url('/')
    })

    it('should have something rendered within 3 seconds', async () => {
        const { firstMeaningfulPaint } = await browser.getPageLogs('sauce:performance')
        expect(firstMeaningfulPaint).toBeLessThan(3 * 1000) // 3 seconds
    })

    it('should be interactive within 3 seconds', async function () {
        const { firstInteractive } = await browser.getPageLogs('sauce:performance')
        expect(firstInteractive).toBeLessThan(3 * 1000) // 3 seconds
    })

    it('should not increase SpeedIndex limit', async () => {
        const { speedIndex } = await browser.getPageLogs('sauce:performance')
        expect(speedIndex).toBeLessThan(4.2 * 1000) // 4.2 seconds
    })

    it('should be loaded within 6.5 seconds', async () => {
        const { load } = await browser.getPageLogs('sauce:performance')
        expect(load).toBeLessThan(6.5 * 1000) // 6.5 seconds
    })

    it('should test performance with a single command', async () => {
        const { result, details } = await browser.assertPerformance(browser.config.capabilities['sauce:options'].name, [
            'firstMeaningfulPaint',
            'firstInteractive',
            'speedIndex',
            'load'
        ])
        expect(result).toBe('pass', `Performance check failed: ${JSON.stringify(details, null, 4)}`)
    })
})
