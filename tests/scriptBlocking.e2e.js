import { expect } from 'chai'

describe('scriptBlocking', () => {
    before(() => {
        browser.cdp('Emulation', 'setCPUThrottlingRate', {
            rate: 4
        })

        browser.cdp('Network', 'emulateNetworkConditions', {
            offline: false,
            latency: 100,
            downloadThroughput: 750e2,
            uploadThroughput: 250e2
        })
        
        browser.startTracing()
        browser.url('/')
        browser.endTracing()
    })
    
    it('should have something rendered within 3.5 seconds', () => {
        const { firstMeaningfulPaint } = browser.getPerformanceMetrics()
        expect(firstMeaningfulPaint).to.be.below(3.5 * 1000) // 2 seconds
    })

    it('should be interactible within 3 seconds', function () {
        const { timeToFirstInteractive } = browser.getPerformanceMetrics()
        
        if (!timeToFirstInteractive) {
            return this.skip()
        }
        
        expect(timeToFirstInteractive).to.be.below(3 * 1000) // 3 seconds
    })
    
    it('should be loaded within 6.5 seconds', () => {
        const { load } = browser.getPerformanceMetrics()
        expect(load).to.be.below(6.5 * 1000) // 6 seconds
    })
})