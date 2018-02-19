import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import ReactGA from 'react-ga';
import { getInstanceData, listener } from './Firebase';
import MeltstoneP from './MeltstoneP';

const totalSlides = 8;

class Join extends React.Component {
  constructor(props) {
    super(props);

    this.error =
      'Invalid presentation ID. Please try clicking the link again or ask the presenter for a resend.';

    const { id } = props.match.params;

    this.state = {
      instanceId: id || null,
      slides: null,
      activeSlide: null,
      currentSlide: null,
      error: id ? null : this.error
    };
  }

  componentWillMount() {
    MeltstoneP('../content', totalSlides).then(slides => {
      this.setState({ slides });
    });
  }

  componentDidMount() {
    // ReactGA.initialize('UA-108723524-1');
    // ReactGA.pageview('Join');
    // ReactGA.ga('send', 'pageview', 'Join');

    const { instanceId, activeSlide } = this.state;

    if (instanceId) {
      getInstanceData(instanceId).then(data => {
        if (!data || data.totalSlides === 0) {
          this.setState({
            error: this.error
          });
          return;
        }

        const { activeSlide, totalSlides } = data;

        this.setState({
          activeSlide,
          currentSlide: activeSlide,
          totalSlides
        });
      });

      listener(instanceId, data => {
        console.log('-- data =', data);
        const targetSlide = data.activeSlide || 1;
        this.setState({
          activeSlide: targetSlide,
          currentSlide: this.state.activeSlide
        });
      });
    }
  }

  render() {
    const { instanceId, slides, activeSlide, currentSlide, error } = this.state;

    return (
      <Wrapper>
        <Content>
          {!error &&
            slides &&
            slides.length > 0 &&
            slides.map((slide, index) => {
              const slideNumber = index + 1;

              return (
                <Slide
                  key={`slide-${slideNumber}`}
                  className={
                    slideNumber === activeSlide ? 'active' : 'inactive'
                  }
                >
                  <InnerWrapper dangerouslySetInnerHTML={{ __html: slide }} />
                </Slide>
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
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #eee;
`;

const Content = styled.ul`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  list-style-type: none;
`;

const Slide = styled.li`
  position: absolute;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  color: #000;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 1px 8px rgba(0, 0, 0, 0.28);

  &.active {
    transform: scale(1);
    top: 0;
    bottom: auto;
    transition: transform 0.6s 0.3s ease-in-out, top 0.3s 0.3s ease-in-out,
      bottom 0.3s 0.3s ease-in-out;
  }
  &.inactive {
    transform: scale(0.9);
    top: 110%;
    bottom: -110%;
    transition: transform 0.3s ease-in-out, top 0.3s 0.3s ease-in-out,
      bottom 0.3s 0.3s ease-in-out;
  }
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

const Error = styled.div`
  padding: 50px 20px;
  font-size: 16pt;
`;

injectGlobal`
  img {
    max-width: 70vw;
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

export default Join;
