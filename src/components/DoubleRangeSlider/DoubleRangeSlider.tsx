import classNames from 'classnames/bind';
import { useState, useEffect, useRef, useCallback } from 'react';

import styles from './DoubleRangeSlider.module.scss';

const cx = classNames.bind(styles);

interface onChangeProps {
  min: number;
  max: number;
}
interface Props extends onChangeProps {
  onChange: (props: onChangeProps) => void;
}

function DoubleRangeSlider({ min, max, onChange }: Props) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLInputElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className={cx('container')}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className={cx('thumb', 'thumb--left')}
        style={{ zIndex: minVal > max - 100 ? '5' : '' }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className={cx('thumb', 'thumb--right')}
      />
      <div className={cx('slider')}>
        <div className={cx('slider-track')} />
        <div ref={range} className={cx('slider-range')} />
        <div className={cx('slider-range-value')}>Range: <span>${minVal} - ${maxVal}</span></div>
      </div>
    </div>
  );
}

export default DoubleRangeSlider;
