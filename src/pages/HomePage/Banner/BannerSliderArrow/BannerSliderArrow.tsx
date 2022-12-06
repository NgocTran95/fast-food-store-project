import './BannerSliderArrow.scss';
interface ArrowProps {
  className?: string;
  to: string;
  onClick?: () => void;
}

export default function BannerSliderArrow({ className, to, onClick }: ArrowProps) {
  return (
    <button type="button" onClick={onClick} className={`slider-arrow ${to} ${className}`} aria-label={to}>
    </button>
  );
}
