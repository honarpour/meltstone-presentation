import React from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import { getInstanceData, setActiveSlide } from './Firebase';

class Controller extends React.Component {
  constructor(props) {
    super(props);

    this.error = 'Error reading data. Please scan presentation QR-code again.';

    this.state = {
      instanceId: props.match.params.id || null,
      activeSlide: 1,
      totalSlides: null,
      error: props.match.params.id ? null : this.error
    };
  }

  componentWillMount() {
    const { instanceId } = this.state;

    if (instanceId) {
      getInstanceData(instanceId).then(data => {
        if (!data || data.totalSlides === 0) {
          this.setState({
            error: this.error
          });
          return;
        }

        const { activeSlide, totalSlides } = data;
        this.setState({ activeSlide, totalSlides });
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

    if (instanceId) {
      setActiveSlide(instanceId, slideNumber);
      this.setState({ activeSlide: slideNumber });
    }
  }

  render() {
    const { activeSlide, totalSlides, error } = this.state;

    return (
      <Wrapper>
        <Header>
          Meltstone<sup>JSP</sup>
        </Header>
        <Content>
          {!error && (
            <Button
              key={`button-${0}`}
              onClick={() => {
                this.getSlide(0);
              }}
              className={activeSlide === 0 ? 'active' : ''}
            >
              Start
            </Button>
          )}
          {!error &&
            totalSlides &&
            totalSlides > 0 &&
            Array.from({ length: totalSlides }).map((entry, index) => {
              const slideNumber = index + 1;

              return (
                <Button
                  key={`button-${slideNumber}`}
                  onClick={() => {
                    this.getSlide(slideNumber);
                  }}
                  className={activeSlide === slideNumber ? 'active' : ''}
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
  position: fixed;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
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
  z-index: 1;

  sup {
    color: #ed4d06;
    font-size: 9pt;
    font-weight: 500;
    margin-left: 2px;
  }
`;

const Content = styled.ul`
  position: fixed;
  list-style-type: none;
  margin: 0;
  padding: 60px 0 0 0;
  box-sizing: border-box;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Button = styled.li`
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  width: 100vw;
  text-align: center;
  font-size: 20pt;
  border: 2px solid #fff;
  cursor: pointer;
  transition: border 0.3s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:nth-child(odd) {
    background-color: #eee;
    border: 2px solid #eee;
  }
  &.active {
    border: 2px dashed #000;
  }
`;

const Error = styled.div`
  padding: 50px 20px;
  font-size: 16pt;
`;

export default Controller;
