import React, { Component } from 'react';
import DropdownItem from './DropdownItem';
import Title from './Title';
import DropdownTextInput from './DropdownTextInput';

const caret = require('../assets/caret.svg');

export default class Dropdown extends Component {
  state = {
    active: false,
  }

    onItemClick = option => {
        this.props.onSelectBibliography(option);
        this.setState({ active: false });
    }

    render() {
        const {
            value,
            options,
            onAdd,
            onDelete
        } = this.props;
        const { active } = this.state;
        return (
            <div style={{...styles.body, ...this.props.style}}>
                <div
                    onClick={() => this.setState({ active: !active })}
                    style={styles.headerContainer}
                >
                    <Title>
                        {value}
                    </Title>
                    <img
                        src={caret}
                        alt='Dropdown'
                        style={styles.icon}
                    />
                </div>
                {active ?
                    <div style={styles.dropdown}>
                        {options.map(option => 
                            <DropdownItem
                                value={option}
                                onClick={() => this.onItemClick(option)}
                                onDelete={() => onDelete(option)}
                            />
                        )}
                        <DropdownTextInput
                            inputText={'Name your bibliography'}
                            handleSubmit={name => {
                                const success = onAdd(name);
                                if(success) this.setState({ active: false });
                                return success;
                            }}
                        />
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

const styles = {
    body: {
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexWrap: 'wrap'
    },
    headerContainer: {
        height: '30px',
        width: '100%',
        padding: '10px 0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dropdown: {
        maxHeight: '400px',
        width: '100%',
        overflowY: 'auto'
    },
    icon: {
        verticalAlign: 'center'
    }
};
