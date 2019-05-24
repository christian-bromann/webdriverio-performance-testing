import { expect } from 'chai'

let metrics, score

describe('My Performance Test', () => {
    before(() => {
        browser.enablePerformanceAudits()
        browser.url('/')
        metrics = browser.getMetrics()
        score = browser.getPerformanceScore()
    })

    it('should not increase firstMeaningfulPaint limit', () => {
        expect(metrics.firstMeaningfulPaint).to.be.below(3 * 1000) // 3 seconds
    })

    it('should not increase timeToFirstInteractive limi', function () {
        expect(metrics.timeToFirstInteractive).to.be.below(3 * 1000) // 3 seconds
    })

    it('should not increase speedIndex limit', () => {
        expect(metrics.speedIndex).to.be.below(4.2 * 1000)
    })

    it('should have a minimum Lighthouse performance score', () => {
        expect(score).to.be.above(0.95)
    })
})
