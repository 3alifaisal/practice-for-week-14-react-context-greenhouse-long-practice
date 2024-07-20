import ReactSlider from "react-slider";
import "./Hygrometer.css";
import { useClimate } from "../../context/ClimateContext";
import { useEffect, useState } from "react";
function Hygrometer() {
  const { humidity, setHumidity } = useClimate();
  const [currentHumidity, setCurrentHumidity] = useState(40);
  useEffect(() => {
    if (currentHumidity === humidity) return;
    let iterator = currentHumidity < humidity ? 1 : -1;
    const timeoutId = setTimeout(() => {
      setCurrentHumidity((prev) => prev + iterator);
    }, 1000);
    return () => clearTimeout(timeoutId);
  });
  return (
    <section>
      <h2>Hygrometer</h2>
      <div className="actual-humid">Actual Humidity: {currentHumidity}%</div>
      <ReactSlider
        value={humidity}
        onAfterChange={(val) => {
          setHumidity(val);
        }}
        className="hygrometer-slider"
        thumbClassName="hygrometer-thumb"
        trackClassName="hygrometer-track"
        ariaLabel={"Hygrometer"}
        orientation="vertical"
        min={0}
        max={100}
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

export default Hygrometer;
