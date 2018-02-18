import React from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import { setActiveSlide } from './Firebase';

class Controller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      instanceId: props.match.params.instanceId || null
    };
  }

  componentDidMount() {
    // ReactGA.initialize('UA-108723524-1');
    // ReactGA.pageview('Controller');
    // ReactGA.ga('send', 'pageview', 'Controller');
  }

  getSlide(slideNumber) {
    const { instanceId } = this.state;
    if (instanceId) setActiveSlide(instanceId, slideNumber);
  }

  render() {
    return (
      <Wrapper>
        <Header>
          Meltstone<sup>JS</sup>
        </Header>
        <Content>
          <Button onClick={() => this.getSlide(1)}>1</Button>
          <Button onClick={() => this.getSlide(2)}>2</Button>
          <Button onClick={() => this.getSlide(3)}>3</Button>
          <Button onClick={() => this.getSlide(4)}>4</Button>
          <Button onClick={() => this.getSlide(5)}>5</Button>
          <Button onClick={() => this.getSlide(6)}>6</Button>
          <Button onClick={() => this.getSlide(7)}>7</Button>
          <Button onClick={() => this.getSlide(8)}>8</Button>
        </Content>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  line-height: 55px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.9);
  color: #000;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  font-size: 16pt;
  letter-spacing: 1px;

  sup {
    color: #ed4d06;
    font-size: 9pt;
    font-weight: 500;
    margin-left: 2px;
  }
`;

const Content = styled.ul`
  margin: 60px 0;
  padding: 0;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const Button = styled.li`
  display: block;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  width: 100vw;
  text-align: center;
  font-size: 20pt;
  cursor: pointer;

  &:nth-child(odd) {
    background-color: #eee;
  }
`;

export default Controller;
