import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import styles from './CustomSelect.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSortType } from '../../features/filters/filtersSlice';
import { SortOption } from '../../features/filters/filtersSlice';

interface Props {
  optionArray: SortOption[];
}

const cx = classNames.bind(styles);
function CustomSelect({ optionArray }: Props) {
  const [showSelectOptions, setShowSelectOptions] = useState(false);
  const dispatch = useAppDispatch()
  const { sort } = useAppSelector(state => state.filters)

  const sortRef = useRef<HTMLDivElement>(null);
  const selectSortOption = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    dispatch(setSortType({ name: e.currentTarget.innerHTML, value: e.currentTarget.dataset.value}))
  };
  
  // Catch outside click event
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (!sortRef.current?.contains(e.target as Node)) {
      setShowSelectOptions(false);
    }
    return;
  };
  
  return (
    <div
      className={cx('sort-select')}
      onClick={() => setShowSelectOptions((prev) => !prev)}
      ref={sortRef}
    >
      {sort.name}
      <FontAwesomeIcon
        className={cx('select-icon')}
        icon={showSelectOptions ? faChevronUp : faChevronDown}
      />
      <ul className={cx('option-list', showSelectOptions && 'show')}>
        {optionArray.map((option, index) => (
          <li
            key={index}
            className={cx('option')}
            data-value={option.value}
            onClick={selectSortOption}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomSelect;
