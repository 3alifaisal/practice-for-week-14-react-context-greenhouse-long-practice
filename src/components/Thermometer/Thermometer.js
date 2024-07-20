import ReactSlider from "react-slider";
import "./Thermometer.css";
import { useClimate } from "../../context/ClimateContext";
import { useEffect, useState } from "react";
function Thermometer() {
  const { temperature, setTemperature } = useClimate();
  const [currentTemperature, setCurrentTemperature] = useState(50);
  useEffect(() => {
    if (currentTemperature === temperature) return;
    // Determine the direction of temperature change
    let iterator = currentTemperature < temperature ? 1 : -1;

    // Function to update temperature
    const updateTemperature = () => {
      setCurrentTemperature((prev) => prev + iterator);
    };
    const timeoutId = setTimeout(updateTemperature, 1000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }, [temperature, currentTemperature]);
  return (
    <section>
      <h2>Thermometer</h2>
      <div className="actual-temp">
        Actual Temperature: {currentTemperature}°F
      </div>
      <ReactSlider
        value={temperature}
        onAfterChange={(val) => {
          setTemperature(val);
        }}
        className="thermometer-slider"
        thumbClassName="thermometer-thumb"
        trackClassName="thermometer-track"
        ariaLabel={"Thermometer"}
        orientation="vertical"
        min={0}
        max={120}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => (
          <div {...props} index={state.index}></div>
        )}
        invert
        pearling
        minDistance={1}
      />
    </section>
  );
}

export default Thermometer;
