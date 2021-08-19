import {assert} from 'chai';
import Block from './block';

class Dummy extends Block {
    render(): string {
        return 'test string';
    }
}

const block = new Dummy('div', {
    attributes: {class: 'test-class'},
});

describe('Block', () => {
    it('render возвращает правильный tagname', () => {
        assert.equal(block.element.tagName, 'DIV');
    });

    it('render возвращает правильное содержимое', () => {
        assert.equal(block.element.innerHTML, 'test string');
    });

    it('можно устанавливать аттрибуты', () => {
        assert.equal(block.element.getAttribute('class'), 'test-class');
    });
});