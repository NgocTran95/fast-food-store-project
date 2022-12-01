import classNames from 'classnames/bind';
import styles from './OderFlow.module.scss';
import firstOderStep from '../../../assets/images/oder-step-1.png';
import secondOderStep from '../../../assets/images/oder-step-2.png';
import thirdOderStep from '../../../assets/images/oder-step-3.png';
import nextImage from '../../../assets/images/next-img.png';
import { keyframes } from '@emotion/react';
import { Reveal } from 'react-awesome-reveal';

const fadeInBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px)
  }
  to {
    opacity: 1;
    transform: translateY(0px)
  }
`;

const cx = classNames.bind(styles);
function OderFlow() {
  return (
    <div className={cx('container')}>
      <div className={cx('inner')}>
        <div className={cx('header')}>
          <p className={cx('title')}>How does it work?</p>
          <p className={cx('content')}>Only 3 steps to enjoy yummy foods</p>
        </div>
        <div className={cx('oder-flow')}>
          <Reveal keyframes={fadeInBottom} duration={500}>
            <div className={cx('flow-step')}>
              <div className={cx('flow-thumbnail')}>
                <div className={cx('step-img')}>
                  <img src={firstOderStep} alt="flow-step" />
                </div>
                <div className={cx('step-num')}>Step 1</div>
              </div>
              <p className={cx('description')}>Select your foods and oder</p>
            </div>
          </Reveal>
          <Reveal keyframes={fadeInBottom} duration={200} delay={500}>
            <img src={nextImage} alt="next-img" className={cx('next-img')} />
          </Reveal>
          <Reveal keyframes={fadeInBottom} duration={500} delay={700}>
            <div className={cx('flow-step')}>
              <div className={cx('flow-thumbnail')}>
                <div className={cx('step-img')}>
                  <img src={secondOderStep} alt="flow-step" />
                </div>
                <div className={cx('step-num')}>Step 2</div>
              </div>
              <p className={cx('description')}>Waiting for us a moment</p>
            </div>
          </Reveal>
          <Reveal keyframes={fadeInBottom} duration={200} delay={1200}>
            <img src={nextImage} alt="next-img" className={cx('next-img')} />
          </Reveal>
          <Reveal keyframes={fadeInBottom} duration={500} delay={1400}>
            <div className={cx('flow-step')}>
              <div className={cx('flow-thumbnail')}>
                <div className={cx('step-img')}>
                  <img src={thirdOderStep} alt="flow-step" />
                </div>
                <div className={cx('step-num')}>Step 3</div>
              </div>
              <p className={cx('description')}>And yup, enjoy your meal!</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export default OderFlow;
