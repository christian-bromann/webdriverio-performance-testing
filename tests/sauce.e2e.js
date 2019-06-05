import { expect } from 'chai'

describe('scriptBlocking', () => {
    before(() => {
        /**
         * replace with `browser.throttleCPU(4)` once
         * https://github.com/webdriverio/webdriverio/pull/4046
         * is merged
         */
        browser.execute('sauce:debug', {
            method: 'Emulation.setCPUThrottlingRate',
            params: { rate: 4 }
        })
        browser.throttleNetwork('Good 3G')
        browser.url('/')
    })

    it('should have something rendered within 3 seconds', () => {
        const { firstMeaningfulPaint } = browser.getPageLogs('sauce:performance')
        expect(firstMeaningfulPaint).to.be.below(3 * 1000) // 3 seconds
    })

    it('should be interactible within 3 seconds', function () {
        const { firstInteractive } = browser.getPageLogs('sauce:performance')
        expect(firstInteractive).to.be.below(3 * 1000) // 3 seconds
    })

    it('should not increase SpeedIndex limit', () => {
        const { speedIndex } = browser.getPageLogs('sauce:performance')
        expect(speedIndex).to.be.below(4.2 * 1000) // 4.2 seconds
    })

    it('should be loaded within 6.5 seconds', () => {
        const { load } = browser.getPageLogs('sauce:performance')
        expect(load).to.be.below(6.5 * 1000) // 6.5 seconds
    })

    it('should test performance with a single command', () => {
        const { result, details } = browser.assertPerformance(browser.config.capabilities['sauce:options'].name, [
            'firstMeaningfulPaint',
            'firstInteractive',
            'speedIndex',
            'load'
        ])
        expect(result).to.be.equal('pass', `Performance check failed: ${JSON.stringify(details, null, 4)}`)
    })
})
