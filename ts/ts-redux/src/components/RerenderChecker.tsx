import React, { Component } from 'react';

interface AdditionalProps {
  newProps?: string;
}
function RerenderWrapper<P>(WrappedComponent: React.ComponentType<P>) {
  return class NewComponent extends Component<P & AdditionalProps> {
    static displayName = `(${getDisplayName(WrappedComponent)})`;

    render() {
      const { newProps, ...props } = this.props
      console.debug('render', NewComponent.displayName)
      return <WrappedComponent {...props as P} />
    }
  };
};

function getDisplayName<P>(WrappedComponent: React.ComponentType<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default RerenderWrapper;

