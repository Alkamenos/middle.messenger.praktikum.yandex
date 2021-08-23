import {render} from 'pug';
import Block from '../../core/Block';

export default class Element extends Block {

    render() {
        return render('', this.props);
    }
}
