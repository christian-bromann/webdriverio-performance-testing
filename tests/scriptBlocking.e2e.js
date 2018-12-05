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
    
    it('should have something rendered within 3 seconds', () => {
        const { firstMeaningfulPaint } = browser.getPerformanceMetrics()
        expect(firstMeaningfulPaint).to.be.below(3 * 1000) // 3 seconds
    })

    it('should be interactible within 3 seconds', function () {
        const { timeToFirstInteractive } = browser.getPerformanceMetrics()
        expect(timeToFirstInteractive).to.be.below(3 * 1000) // 3 seconds
    })
    
    it('should not increase SpeedIndex limit', () => {
        const { perceptualSpeedIndex, speedIndex } = browser.getSpeedIndex()
        expect(perceptualSpeedIndex).to.be.below(4.2 * 1000)
    })
    
    it('should be loaded within 6.5 seconds', () => {
        const { load } = browser.getPerformanceMetrics()
        expect(load).to.be.below(6.5 * 1000) // 6 seconds
    })
})