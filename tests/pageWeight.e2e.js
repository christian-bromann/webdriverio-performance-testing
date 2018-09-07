import { expect } from 'chai'

describe('pageWeight', () => {
    before(() => {
        browser.url('/')
    })

    it('should load not more than 450kb', () => {
        const { transferred } = browser.getPageWeight()
        expect(transferred).to.be.below(450 * 1000)
    })
    
    it('images should be compressed', () => {
        const { details } = browser.getPageWeight()
        expect(details.Image.encoded).to.be.below(200 * 1000)
    })
    
    it('scripts should be minified', () => {
        const { details } = browser.getPageWeight()
        expect(details.Script.encoded).to.be.below(250 * 1000)
    })
})