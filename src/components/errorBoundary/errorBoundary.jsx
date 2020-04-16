import React from 'react';
import ErrorIndicator from '../errorIndicator/errorIndicator.jsx';

class ErrorBoundary extends React.PureComponent {
    state = {
        isError: false
    }

    componentDidCatch() {
        this.setState({
            isError: true
        });
    }

    render() {
        if(this.state.isError) {
            return <ErrorIndicator operation="loading of this website" />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
