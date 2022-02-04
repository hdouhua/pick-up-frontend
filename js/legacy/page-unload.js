import { PureComponent } from 'react'

export default class extends PureComponent {
    UNSAFE_componentWillMount() {
        window.addEventListener('beforeunload', this.beforeunloadHandle)
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.beforeunloadHandle)
    }

    beforeunloadHandle(e) {
        const msg = 'There are unsaved changes. Leave now?'
        e.returnValue = msg
        return msg
    }

    render() {
        return null
    }
}
