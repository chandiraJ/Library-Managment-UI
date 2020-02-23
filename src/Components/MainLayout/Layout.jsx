import React, {Component} from 'react';

import Header from './Header';
import Sider from './Sider';

export default class Layout extends Component {
    render() {
        return <div>
            <Header/>
            <div className={'sider-n-content'}>
                <Sider/>
            </div>
        </div>
    }
}