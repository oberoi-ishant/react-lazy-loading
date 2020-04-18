"use strict";
import React from 'react';

// Empty component acting as default for Default or Error Component.
const EmptyComp = () => null;

const ReactLoader = ({
  DefaultComp = EmptyComp,
  ErrorComp = EmptyComp,
  loader,
  name,
  delay
}) => class extends React.Component {
  constructor(props) {
    super(props);
    // initial state
    this.state = {
      lazyLoadComponent: DefaultComp,
      loadFinished: false,
      loadError: null
    }
  }

  componentDidMount() {
    /* Call the loader function to load the component */
    this.loadComp();
  }

  processLoad() {
    loader()
      .then(module => this.setState(
        {
          lazyLoadComponent: name ? module[name] : module.default,
          loadFinished: true,
          loadError: null
        }))
      .catch(err => this.setState({
        lazyLoadComponent: ErrorComp,
        loadFinished: true,
        loadError: err
      }));
  }

  loadComp() {
    if (!isNaN(delay)) {
      setTimeout(this.processLoad.bind(this), delay);
      return;
    }
    this.processLoad();
  }

  render() {
    const { loadFinished, loadError, lazyLoadComponent } = this.state;
    return React.createElement(lazyLoadComponent, {
      loadFinished,
      loadError,
      ...this.props
    }, null);
  }
}

export default ReactLoader;
