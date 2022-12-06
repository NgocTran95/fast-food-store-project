import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './OfferMenuSliderArrow.scss';
interface ArrowProps {
  className?: string;
  to: string;
  onClick?: () => void;
}

export default function OfferMenuSliderArrow({ className, to, onClick }: ArrowProps) {
  return (
    <div onClick={onClick} className={`offer-menu-slider-arrow ${to} ${className}`} aria-label={to}>
      <FontAwesomeIcon className='offer-menu-slider-arrow-icon' icon={to === 'prev' ? faChevronLeft : faChevronRight}/>
    </div>
  );
}
