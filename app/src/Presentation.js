import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import ReactGA from 'react-ga';
import uuidv1 from 'uuid/v1';
import { Firebase, registerInstance, deleteInstance } from './Firebase';
import MeltstoneP from './MeltstoneP';

const totalSlides = 8;

class Presentation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      instanceId: uuidv1().replace(/-/g, ''),
      slides: null,
      activeSlide: parseInt(this.props.match.params.slide) || 1
    };
  }

  componentWillMount() {
    MeltstoneP('content', totalSlides).then(slides => {
      this.setState({ slides });
    });
  }

  componentDidMount() {
    // ReactGA.initialize('UA-108723524-1');
    // ReactGA.pageview('Landing Page');
    // ReactGA.ga('send', 'pageview', 'Landing Page');

    const { instanceId, activeSlide } = this.state;

    registerInstance(instanceId, activeSlide, totalSlides);

    Firebase.on('value', snap => {
      const data = snap.val();
      const targetSlide = data[instanceId].activeSlide;

      this.goToSlide(targetSlide);

      console.log('-- data =', data);
    });
  }

  componentWillUnmount() {
    const { instanceId } = this.state;
    deleteInstance(instanceId);
  }

  componentWillReceiveProps(nextPops) {
    this.setState({
      activeSlide: parseInt(nextPops.match.params.slide) || 1
    });
  }

  goToSlide(slideNumber) {
    const { history } = this.props;
    history.push(`/${slideNumber}`);
  }

  render() {
    const { instanceId, slides, activeSlide } = this.state;

    return (
      <Wrapper>
        <Content>
          {slides &&
            slides.length > 0 &&
            slides.map((block, index) => {
              const slideNumber = index + 1;

              return (
                <Slide
                  key={`slide-${slideNumber}`}
                  show={slideNumber === activeSlide}
                >
                  <InnerWrapper dangerouslySetInnerHTML={{ __html: block }} />
                </Slide>
              );
            })}
        </Content>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

/*
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
*/

const Content = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const Slide = styled.li`
  position: relative;
  display: ${props => (props.show ? 'block' : 'none')};
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
`;

const InnerWrapper = styled.div`
  position: absolute;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  width: 100vw;
  max-height: 100vh;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
`;

injectGlobal`
  img {
    max-width: 100%;
  }
  h1 {
    color: #000;
    font-size: 7vw;
    letter-spacing: 2px;
  }
  p {
    color: #000;
    font-size: 4vw;
    line-height: 1.7em;
  }
`;

export default Presentation;
