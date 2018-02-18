import React from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import { getTotalSlides, setActiveSlide } from './Firebase';

class Controller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      instanceId: props.match.params.instanceId || null,
      totalSlides: null,
      error: null
    };
  }

  componentWillMount() {
    const { instanceId } = this.state;

    if (instanceId) {
      getTotalSlides(instanceId).then(totalSlides => {
        if (!totalSlides) {
          this.setState({
            error: 'Error reading data. Please scan presentation QR-code again.'
          });
          return;
        }
        this.setState({ totalSlides });
      });
    }
  }

  componentDidMount() {
    // ReactGA.initialize('UA-108723524-1');
    // ReactGA.pageview('Controller');
    // ReactGA.ga('send', 'pageview', 'Controller');
  }

  getSlide(slideNumber) {
    // ReactGA.ga('send', `slide-request:${slideNumber}`, 'Controller');
    const { instanceId } = this.state;
    if (instanceId) setActiveSlide(instanceId, slideNumber);
  }

  render() {
    const { totalSlides, error } = this.state;

    return (
      <Wrapper>
        <Header>
          Meltstone<sup>JSP</sup>
        </Header>
        <Content>
          {totalSlides &&
            totalSlides > 0 &&
            Array.from({ length: totalSlides }).map((entry, index) => {
              const slideNumber = index + 1;

              return (
                <Button
                  key={`button-${slideNumber}`}
                  onClick={() => {
                    this.getSlide(slideNumber);
                  }}
                >
                  {slideNumber}
                </Button>
              );
            })}
          {error && <Error>{error}</Error>}
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

const Error = styled.div`
  padding: 50px 20px;
  font-size: 16pt;
`;

export default Controller;
