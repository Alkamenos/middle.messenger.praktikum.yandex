import {assert} from 'chai';
import Block from './Block';

class Dummy extends Block {
    render(): string {
        return 'test string';
    }
}

const block = new Dummy('div', {
    attributes: {class: 'test-class'},
});

// eslint-disable-next-line no-undef
describe('Block', () => {
    // eslint-disable-next-line no-undef
    it('render возвращает правильный tagname', () => {
        assert.equal(block.element.tagName, 'DIV');
    });

    // eslint-disable-next-line no-undef
    it('render возвращает правильное содержимое', () => {
        assert.equal(block.element.innerHTML, 'test string');
    });

    // eslint-disable-next-line no-undef
    it('можно устанавливать аттрибуты', () => {
        assert.equal(block.element.getAttribute('class'), 'test-class');
    });

    // eslint-disable-next-line no-undef
    it('меняет props при вызове setProps', () => {
        block.setProps({__id:'test'})
        assert.deepEqual(block.props, {__id:'test', attributes:{class:'test-class'}});
    });
});