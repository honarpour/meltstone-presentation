import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import ReactGA from 'react-ga';
import uuidv1 from 'uuid/v1';
import QRCode from 'qrcode';
import MeltstoneP from './MeltstoneP';
import Config from './Config';
import Logo from './Logo';
import { getCtrlUrl, getShareUrl } from './Helpers';
import {
  firebaseRef,
  registerInstance,
  listener,
  setActiveSlide
} from './Firebase';

class Presentation extends React.Component {
  constructor(props) {
    super(props);

    const { id, slide } = props.match.params;
    const instanceId = id || uuidv1().replace(/-/g, '');

    this.state = {
      instanceId,
      slides: null,
      activeSlide: parseInt(slide) || 0,
      currentSlide: parseInt(slide) || 0,
      spaceSlide: 0,
      totalSlides: Config.presentation.totalSlides,
      qr: ''
    };

    this.navigation = this.navigation.bind(this);
  }

  componentWillMount() {
    const { instanceId, totalSlides } = this.state;

    const controllerUrl = getCtrlUrl(instanceId);

    QRCode.toDataURL(controllerUrl)
      .then(qr => {
        this.setState({ qr });
      })
      .catch(error => {
        console.log('Error generating QR-code:', error);
      });

    MeltstoneP('../content', totalSlides).then(slides => {
      this.setState({ slides });
    });

    document.addEventListener('keyup', this.navigation);
  }

  componentDidMount() {
    // ReactGA.initialize('UA-108723524-1');
    // ReactGA.pageview('Presentation');
    // ReactGA.ga('send', 'pageview', 'Presentation');

    const { instanceId, activeSlide, totalSlides } = this.state;

    registerInstance(instanceId, activeSlide, totalSlides);

    listener(instanceId, data => {
      const targetSlide = data.activeSlide || 0;
      this.goToSlide(targetSlide);
    });
  }

  componentWillReceiveProps(nextPops) {
    const activeSlide = parseInt(nextPops.match.params.slide);
    const currentSlide = parseInt(this.props.match.params.slide);

    this.setState({ activeSlide, currentSlide });
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.navigation);
  }

  goToSlide(slideNumber) {
    const { history } = this.props;
    const { instanceId } = this.state;
    history.push(`/${instanceId}/${slideNumber}`);
  }

  navigation(event) {
    const { keyCode } = event;
    const {
      instanceId,
      activeSlide,
      currentSlide,
      spaceSlide,
      totalSlides
    } = this.state;

    switch (keyCode) {
      case 37: // Left
        const prevSlide = activeSlide - 1 === -1 ? 0 : activeSlide - 1;

        this.goToSlide(prevSlide);
        setActiveSlide(instanceId, prevSlide);
        // ReactGA.ga('send', `keyboard-nav-left`, 'Presentation');
        break;

      case 39: // Right
        const nextSlide =
          activeSlide + 1 === totalSlides + 1 ? totalSlides : activeSlide + 1;

        this.goToSlide(nextSlide);
        setActiveSlide(instanceId, nextSlide);
        // ReactGA.ga('send', `keyboard-nav-right`, 'Presentation');
        break;

      case 32: // Spacebar
        let jumpSlide = 0;

        if (currentSlide !== 0) {
          this.setState({ spaceSlide: currentSlide });
        } else {
          jumpSlide = spaceSlide;
        }

        this.goToSlide(jumpSlide);
        setActiveSlide(instanceId, jumpSlide);
        // ReactGA.ga('send', `keyboard-nav-spacebar`, 'Presentation');
        break;

      default:
        return;
    }
  }

  render() {
    const { instanceId, slides, activeSlide, currentSlide, qr } = this.state;
    const shareUrl = getShareUrl(instanceId);

    return (
      <Wrapper>
        <Content>
          <Slide
            key={`slide-${0}`}
            className={0 === activeSlide ? 'active' : 'inactive'}
          >
            <InnerWrapper>
              <Logo />
              <p>
                Use left and right arrows of keyboard or
                <br />
                scan QR-code to navigate presentation:
                <br />
                <img src={qr} alt="Controller QR-code" />
              </p>
              <p>
                Share for simultaneous presentations:
                <br />
                {shareUrl}
              </p>
            </InnerWrapper>
          </Slide>
          {slides &&
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

export default Presentation;
