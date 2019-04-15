// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import c from 'classnames';
import {Callout} from 'office-ui-fabric-react/lib/Callout';
import PropTypes from 'prop-types';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';

import {monacoHack} from './monaco-hack.scss';
import t from '../../../../../../css/tachyons.css';

export default class MonacoCallout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.show = this.show.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.toggle = this.toggle.bind(this);
    this.buttonRef = React.createRef();
  }

  show() {
    this.setState({open: true});
  }

  dismiss() {
    this.setState({open: false});
  }

  toggle() {
    const {open} = this.state;
    this.setState({open: !open});
  }

  render() {
    const {open} = this.state;
    const {children} = this.props;

    return (
      <div>
        <div ref={this.buttonRef} onClick={this.toggle}>
          {children}
        </div>
        <Callout
          target={this.buttonRef.current}
          onDismiss={this.dismiss}
          setInitialFocus={true}
          hidden={!open}
        >
          <div className={c(t.overflowHidden, monacoHack)}>
            {open && (
              <MonacoEditor
                width={800}
                height={500}
                theme='vs'
                options={{
                  wordWrap: 'on',
                  readOnly: true,
                }}
                {...this.props}
              />
            )}
          </div>
        </Callout>
      </div>
    );
  }
}

MonacoCallout.propTypes = {
  children: PropTypes.node,
};
