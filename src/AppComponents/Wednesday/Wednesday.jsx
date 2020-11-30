import React from 'react';
import styles from './Wednesday.module.css';
import * as api from '../../dal/postSendApi'

class Wednesday extends React.Component {

    state = {
        themes: [
            {name: 'Брют', checked: null},
            {name: 'Розовое сухое', checked: null},
            {name: 'Бордо', checked: null}
        ],
        isDone: false
    }

    onChangedStyles = (e) => this.props.changedStyles(e.target.value)
    isDoneChanged = (e) => this.setState({isDone: e.currentTarget.checked})
    onClick = () => api.tryCatch(() => api.postSend(this.state.isDone))

    render() {
        let classWednesday
        switch (this.props.state) {
            case 'Брют':
                classWednesday = styles.brut
                break
            case 'Розовое сухое':
                classWednesday = styles.rose
                break
            default:
                classWednesday = styles.bordo
        }

        let checked = {
            ...this.state,
            themes: this.state.themes.map(theme => {
                return theme.name === this.props.state
                    ? {
                        ...theme,
                        checked: true
                    }
                    : {
                        ...theme,
                        checked: false
                    }
            })
        }

        return (
            <div className={classWednesday}>
                {checked.themes.map(theme => {
                    return (
                        <span key={theme.name}>
                        <input
                            type={'radio'}
                            name={'theme'}
                            value={theme.name}
                            checked={theme.checked}
                            onChange={this.onChangedStyles}
                        />
                            {theme.name}
                         </span>
                    )
                })}
                <div>
                    <input
                        type="checkbox"
                        checked={this.state.isDone}
                        onChange={this.isDoneChanged}
                    />
                    <button
                        onClick={this.onClick}
                    >SEND
                    </button>
                </div>
            </div>
        )
    }
}

export default Wednesday
