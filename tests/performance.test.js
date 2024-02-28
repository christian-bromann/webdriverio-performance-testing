import { expect, browser } from '@wdio/globals'

describe('My Performance Test', () => {
    let metrics, score

    before(async () => {
        await browser.enablePerformanceAudits()
        await browser.url('/')
        metrics = await browser.getMetrics()
        score = await browser.getPerformanceScore()

        console.log('Metrics:', metrics);
        console.log('Score:', score);
    })

    it('should not increase firstMeaningfulPaint limit', () => {
        expect(metrics.firstMeaningfulPaint).toBeLessThan(3 * 1000) // 3 seconds
    })

    it('should not increase firstInteractive limit', function () {
        expect(metrics.interactive).toBeLessThan(2 * 1000) // 2 seconds
    })

    it('should not increase speedIndex limit', () => {
        expect(metrics.speedIndex).toBeLessThan(4.2 * 1000)
    })

    it('should have a minimum Lighthouse performance score', () => {
        expect(score).toBeGreaterThanOrEqual(0.75)
    })
})
