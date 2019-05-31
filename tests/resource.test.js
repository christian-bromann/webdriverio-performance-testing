import { expect } from 'chai'

let transferred, details

describe('pageWeight', () => {
    before(() => {
        browser.enablePerformanceAudits({
          networkThrottling: 'online',
          cpuThrottling: 0,
          cacheEnabled: false
        })
        browser.url('/')
        const pageWeight = browser.getPageWeight()
        transferred = pageWeight.transferred
        details = pageWeight.details
    })

    it('should load not more than 450kb', () => {
        expect(transferred).to.be.below(450 * 1000)
    })

    it('images should be compressed', () => {
        expect(details.Image.encoded).to.be.below(200 * 1000)
    })

    it('scripts should be minified', () => {
        expect(details.Script.encoded).to.be.below(250 * 1000)
    })
})
