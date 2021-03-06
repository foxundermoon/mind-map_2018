import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'

import ToolBtn from './tool-btn'

import * as actions from '../actions'
import { saveMap } from '../helpers/storage'

import styles from '../css/tools.css'


@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Tools extends React.Component {
    state = {
        showToolGrp: false
    }
    
    toggleShowToolGrp = () => this.setState({ showToolGrp: !this.state.showToolGrp })
    
    handleOptionsOnMap = type => {
        if (!this.props.selectedId) return
        this.props.dispatch(actions[type](this.props.selectedId));
    }
    
    render() {
        const { showToolGrp } = this.state;
        
        return <div styleName="container">
            
            <div styleName={showToolGrp ? "expand-btn-expanded" : "expand-btn"}
                onClick={this.toggleShowToolGrp}>
                <svg viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    { showToolGrp ?
                        <path d={ICON_PATH.fold} />
                        :
                        <path d={ICON_PATH.expand} />
                    }
                </svg>
            </div>
            
            <div styleName="tool-grp-container">
                <div styleName="tool-grp"
                    style={{ 
                        transform: `translateX(${showToolGrp ? 0 : 320}px)`,
                        opacity: showToolGrp ? 1 : 0
                    }}>
                    
                    <ToolBtn {...TOOL_BTN_TIP_INFO.copy} svgPath={ICON_PATH.copy}
                        handleClick={() => this.handleOptionsOnMap('copy')} />
                    <ToolBtn {...TOOL_BTN_TIP_INFO.paste} svgPath={ICON_PATH.paste} 
                        handleClick={() => this.handleOptionsOnMap('paste')} />
                    <ToolBtn {...TOOL_BTN_TIP_INFO.cut} svgPath={ICON_PATH.cut} 
                        handleClick={() => this.handleOptionsOnMap('cut')} />
                    <ToolBtn {...TOOL_BTN_TIP_INFO.remove} svgPath={ICON_PATH.remove} 
                        handleClick={() => this.handleOptionsOnMap('remove')} />
                        
                    <div styleName="vertical-line" />
                    
                    <ToolBtn {...TOOL_BTN_TIP_INFO.numberChild} svgPath={ICON_PATH.numberChild} 
                        handleClick={() => this.handleOptionsOnMap('numberChild')} />
                        
                    <div styleName="vertical-line" />
                    
                    <ToolBtn {...TOOL_BTN_TIP_INFO.save} svgPath={ICON_PATH.save} 
                        handleClick={() => saveMap(this.props.map)} />
                </div>
            </div>
        </div>
    }
}

const ICON_PATH = {
    expand: 'M24.727 18.948h-5.779v5.779h-1.896v-5.779h-5.779v-1.896h5.779v-5.779h1.896v5.779h5.779v1.896z',
    fold: 'M25.359 19.037h-14.717v-2.074h14.717v2.074z',
    copy: 'M24.888 13.592c0.456 0 0.827 0.37 0.827 0.827v10.47c0 0.456-0.37 0.827-0.827 0.827h-8.266c-0.456 0-0.827-0.37-0.827-0.827v-2.48h-4.684c-0.456 0-0.827-0.37-0.827-0.827v-5.786c0-0.456 0.267-1.093 0.586-1.412l3.513-3.513c0.319-0.319 0.956-0.586 1.412-0.586h3.582c0.456 0 0.827 0.37 0.827 0.827v2.824c0.336-0.198 0.766-0.344 1.102-0.344h3.582zM20.204 15.426l-2.574 2.574h2.574v-2.574zM14.694 12.119l-2.574 2.574h2.574v-2.574zM16.381 17.69l2.721-2.721v-3.582h-3.306v3.582c0 0.456-0.37 0.827-0.827 0.827h-3.582v5.511h4.408v-2.204c0-0.456 0.267-1.094 0.586-1.412zM24.613 24.613v-9.919h-3.306v3.582c0 0.456-0.37 0.827-0.827 0.827h-3.582v5.511h7.715z',
    paste: 'M16.898 24.613h7.715v-5.511h-3.582c-0.456 0-0.827-0.37-0.827-0.827v-3.582h-3.306v9.919zM19.102 12.214v-0.551c0-0.146-0.129-0.276-0.276-0.276h-6.062c-0.146 0-0.276 0.129-0.276 0.276v0.551c0 0.146 0.129 0.276 0.276 0.276h6.062c0.146 0 0.276-0.129 0.276-0.276zM21.306 18h2.575l-2.575-2.575v2.575zM25.715 19.102v5.786c0 0.456-0.37 0.827-0.827 0.827h-8.266c-0.456 0-0.827-0.37-0.827-0.827v-1.378h-4.684c-0.456 0-0.827-0.37-0.827-0.827v-11.572c0-0.456 0.37-0.827 0.827-0.827h9.368c0.456 0 0.827 0.37 0.827 0.827v2.824c0.112 0.069 0.215 0.146 0.31 0.241l3.513 3.513c0.327 0.327 0.586 0.956 0.586 1.412z',
    cut: 'M23.231 11.26h2.247v0.737l-5.231 5.266-1.51-1.51zM18 18.386c0.211 0 0.386-0.175 0.386-0.386s-0.175-0.386-0.386-0.386-0.386 0.175-0.386 0.386 0.175 0.386 0.386 0.386zM13.507 24.003c0.807 0 1.51-0.667 1.51-1.51s-0.702-1.51-1.51-1.51-1.51 0.667-1.51 1.51 0.702 1.51 1.51 1.51zM13.507 15.016c0.807 0 1.51-0.667 1.51-1.51s-0.702-1.51-1.51-1.51-1.51 0.667-1.51 1.51 0.702 1.51 1.51 1.51zM16.245 14.735l9.232 9.267v0.737h-2.247l-5.231-5.231-1.755 1.755c0.175 0.386 0.246 0.772 0.246 1.229 0 1.65-1.334 2.984-2.984 2.984s-2.984-1.334-2.984-2.984 1.334-2.984 2.984-2.984c0.456 0 0.842 0.070 1.229 0.246l1.755-1.755-1.755-1.755c-0.386 0.175-0.772 0.246-1.229 0.246-1.65 0-2.984-1.334-2.984-2.984s1.334-2.984 2.984-2.984 2.984 1.334 2.984 2.984c0 0.456-0.070 0.842-0.246 1.229z',
    remove: 'M24.727 12.627l-5.373 5.373 5.373 5.373-1.354 1.354-5.373-5.373-5.373 5.373-1.354-1.354 5.373-5.373-5.373-5.373 1.354-1.354 5.373 5.373 5.373-5.373z',
    numberChild: 'M13.682 24.192c0 0.941-0.735 1.471-1.625 1.471-0.539 0-1.086-0.18-1.471-0.565l0.488-0.753c0.231 0.214 0.582 0.385 0.907 0.385 0.299 0 0.616-0.145 0.616-0.488 0-0.479-0.547-0.505-0.898-0.479l-0.222-0.479c0.308-0.393 0.59-0.83 0.958-1.163v-0.009c-0.274 0-0.556 0.017-0.83 0.017v0.453h-0.907v-1.3h2.848v0.753l-0.812 0.984c0.573 0.137 0.949 0.582 0.949 1.172zM13.699 18.83v1.36h-3.096c-0.026-0.154-0.051-0.308-0.051-0.462 0-1.582 1.933-1.822 1.933-2.54 0-0.291-0.18-0.445-0.462-0.445-0.299 0-0.547 0.257-0.693 0.496l-0.727-0.505c0.282-0.59 0.864-0.924 1.514-0.924 0.795 0 1.48 0.47 1.48 1.317 0 1.266-1.856 1.548-1.881 2.215h1.086v-0.513h0.898zM25.749 21.558v1.642c0 0.145-0.128 0.274-0.274 0.274h-10.399c-0.154 0-0.274-0.128-0.274-0.274v-1.642c0-0.154 0.12-0.274 0.274-0.274h10.399c0.145 0 0.274 0.12 0.274 0.274zM13.708 13.869v0.847h-2.865v-0.847h0.915c0-0.693 0.009-1.385 0.009-2.078v-0.103h-0.017c-0.094 0.188-0.265 0.316-0.428 0.462l-0.607-0.65 1.163-1.086h0.907v3.455h0.924zM25.749 17.179v1.642c0 0.145-0.128 0.274-0.274 0.274h-10.399c-0.154 0-0.274-0.128-0.274-0.274v-1.642c0-0.154 0.12-0.274 0.274-0.274h10.399c0.145 0 0.274 0.12 0.274 0.274zM25.749 12.8v1.642c0 0.145-0.128 0.274-0.274 0.274h-10.399c-0.154 0-0.274-0.128-0.274-0.274v-1.642c0-0.145 0.12-0.274 0.274-0.274h10.399c0.145 0 0.274 0.128 0.274 0.274z',
    save: 'M21.769 18.74h-2.255v-2.994h-3.030v2.994h-2.254l3.769 3.769zM23.531 16.52c1.938 0.141 3.487 1.761 3.487 3.734 0 2.078-1.691 3.769-3.769 3.769h-9.758c-2.501 0-4.509-2.008-4.509-4.509 0-2.325 1.761-4.227 4.016-4.474 0.951-1.797 2.818-3.065 5.002-3.065 2.748 0 5.002 1.938 5.531 4.544',
}

const TOOL_BTN_TIP_INFO = {
    copy: {
        name: '复制',
        shortcut: 'Ctrl + C'
    },
    paste: {
        name: '粘贴',
        shortcut: 'Ctrl + V'
    },
    cut: {
        name: '剪切',
        shortcut: 'Ctrl + X'
    },
    remove: {
        name: '删除分支',
        shortcut: 'Delete'
    },
    numberChild: {
        name: '编号子级',
        shortcut: 'Ctrl + L'
    },
    save: {
        name: '保存',
        shortcut: 'Ctrl + S'
    },
}


export default connect(state => state)(Tools)