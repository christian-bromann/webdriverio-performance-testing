import { expect } from 'chai'

describe('scriptBlocking', () => {
    before(() => {
        browser.url('/')
    })

    it('should have something rendered within 3 seconds', () => {
        const { firstMeaningfulPaint } = browser.getPageLogs('sauce:performance')
        expect(firstMeaningfulPaint).to.be.below(3 * 1000) // 3 seconds
    })

    it('should be interactible within 3 seconds', function () {
        const { timeToFirstInteractive } = browser.getPageLogs('sauce:performance')
        expect(timeToFirstInteractive).to.be.below(3 * 1000) // 3 seconds
    })

    it('should not increase SpeedIndex limit', () => {
        const { perceptualSpeedIndex, speedIndex } = browser.getPageLogs('sauce:performance')
        expect(perceptualSpeedIndex).to.be.below(4.2 * 1000)
    })

    it('should be loaded within 6.5 seconds', () => {
        const { load } = browser.getPageLogs('sauce:performance')
        expect(load).to.be.below(6.5 * 1000) // 6 seconds
    })
})
