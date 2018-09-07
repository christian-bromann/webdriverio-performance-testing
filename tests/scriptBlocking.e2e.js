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

    it('should be interactible within 3 seconds', () => {
        const { timeToFirstInteractive } = browser.getPerformanceMetrics()
        expect(timeToFirstInteractive).to.be.below(3 * 1000)
    })
    
    it('should be loaded within 6 seconds', () => {
        const { timeToFirstInteractive } = browser.getPerformanceMetrics()
        expect(timeToFirstInteractive).to.be.below(6 * 1000)
    })
})