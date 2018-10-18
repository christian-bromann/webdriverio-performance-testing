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
        
        /**
         * In most cases this metric can't be determined based on the nature of
         * how it is measured. It would require to trace a time frame where the
         * browser is not running any long tasks or is doing heavy I/O work. Since
         * we stop tracing right after page load that window is often not captured.
         */
        if (!timeToFirstInteractive) {
            return this.skip()
        }
        
        expect(timeToFirstInteractive).to.be.below(3 * 1000) // 3 seconds
    })
    
    it('should not increase SpeedIndex limit', () => {
        const { perceptualSpeedIndex } = browser.getSpeedIndex()
        expect(perceptualSpeedIndex).to.be.below(3.5 * 1000)
    })
    
    it('should be loaded within 6.5 seconds', () => {
        const { load } = browser.getPerformanceMetrics()
        expect(load).to.be.below(6.5 * 1000) // 6 seconds
    })
})