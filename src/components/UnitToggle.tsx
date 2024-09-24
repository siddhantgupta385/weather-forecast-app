interface UnitToggleProps {
  unit: 'metric' | 'imperial';
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => (
  <button onClick={onToggle}>
    {unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
  </button>
);

export default UnitToggle;
