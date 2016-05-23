import React from 'react';

export const sharedState = (C, prop = 'sharedComponent') =>
  class _sharedState extends React.Component {
    constructor(props) {
      super(props);

      this.state = {};

      const store = props[prop];
      getComponentInstance(store).then(instance => {
        this.shareStore = instance;
        this.shareStore.subscribe(this._updateState);

        this.setState({ instance });
      }, () => {});
    }

    _updateState = shared => this.setState({ shared });

    componentWillUnmount() {
      this.shareStore && this.shareStore.unsubscribe(this._updateState);
    }

    render() {
      const { shared, instance } = this.state;
      return <C {...this.props} _shared={shared} _instance={instance} />;
    }
  }

export const getComponentInstance = (store, ms = 100) =>
  new Promise((resolve, reject) => {
    if (!store) {
      reject(store);
    } else {
      if (store._shareInstance) {
        resolve(store._shareInstance);
      } else {
        setTimeout(() => store._shareInstance && resolve(store._shareInstance), ms);
      }
    }
  });
