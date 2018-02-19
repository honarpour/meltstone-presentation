import React from 'react';
import styled from 'styled-components';

class Logo extends React.Component {
  render() {
    const isInline = this.props.inline;

    return (
      <MSPLogo className={isInline ? 'inline' : ''}>
        Meltstone<sup>JSP</sup>
      </MSPLogo>
    );
  }
}

const MSPLogo = styled.div`
  margin: 30px auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.9);
  color: #000;
  font-size: 16pt;
  letter-spacing: 1px;

  sup {
    color: #ed4d06;
    font-size: 9pt;
    font-weight: 500;
    margin-left: 2px;
  }

  &.inline {
    margin: 0;
    padding: 0;
    display: inline-block;
  }
`;

export default Logo;
