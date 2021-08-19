import Block from '../../core/Block';
import {render} from 'pug';

export default class Element extends Block {

    render() {
        return render('', this.props);
    }
}
