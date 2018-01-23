import React from 'react'
import { connect } from 'react-redux'

import { 
    editItem,
    addItem
} from '../actions'

import AddBtnGrp from './add-btn-grp'

import '../css/item.css'


class Item extends React.Component {
    
    firstClickStamp = null
    
    state = { showAddBtnGrp: false }
    
    handlePossibleExit = e => {
        if (e.key === 'Enter') this.input.blur();
    }
    
    handleChange = e => this.props.dispatch(editItem(this.props.id, e.target.value))
    
    toggleMask = () => this.mask.style.display = this.mask.style.display === 'none' ? 'block' : 'none'
    
    handleAddItem = type => this.props.dispatch(addItem[type](this.props.id))
    
    emitEditOrSelect = e => {
        e.preventDefault();
        if (!this.firstClickStamp) {
            this.firstClickStamp = Date.now();
            // select
        } else {
            const timeStamp = Date.now();
            if (timeStamp - this.firstClickStamp < 300) {
                // edit
                this.toggleMask();
                this.input.focus();
                this.firstClickStamp = null;
            } else {
                this.firstClickStamp = timeStamp;
            }
        }
    }
    
    render() {
        return <div className="item" 
            onMouseEnter={() => this.setState({ showAddBtnGrp: true })}
            onMouseLeave={() => this.setState({ showAddBtnGrp: false })}>
            
            <textarea className="item-input"
                ref={input => this.input = input}
                value={this.props.text}
                onKeyDown={this.handlePossibleExit}
                onChange={this.handleChange}
                onBlur={this.toggleMask} />
                
            <label className="item-mask"
                ref={label => this.mask = label}
                onMouseDown={this.emitEditOrSelect} />
                
            <AddBtnGrp showGrp={this.state.showAddBtnGrp} handleClick={this.handleAddItem} />
            
            { this.props.text }
        </div>
    }
    
}

export default connect(state => state)(Item)