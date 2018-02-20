import React from 'react';
import styled from 'styled-components';
import Config from './Config';

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
  color: ${Config.presentation.colors.text || '#000'};
  font-size: 16pt;
  letter-spacing: 1px;

  sup {
    color: ${Config.presentation.colors.main || '#ed4d06'};
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
