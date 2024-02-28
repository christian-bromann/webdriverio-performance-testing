import { expect, browser } from '@wdio/globals'

let transferred, details

describe('pageWeight', () => {
    before(async () => {
        await browser.enablePerformanceAudits({
          networkThrottling: 'online',
          cpuThrottling: 0,
          cacheEnabled: false
        })
        await browser.url('/')
        const pageWeight = await browser.getPageWeight()
        transferred = pageWeight.transferred
        details = pageWeight.details
    })

    it('should load not more than 450kb', () => {
        expect(transferred).toBeLessThan(3.1 * 1000 * 1000)
    })

    it('images should be compressed', () => {
        expect(details.Image.encoded).toBeLessThan(200 * 1000)
    })

    it('scripts should be minified', () => {
        expect(details.Script.encoded).toBeLessThan(1.5 * 1000 * 1000)
    })
})
