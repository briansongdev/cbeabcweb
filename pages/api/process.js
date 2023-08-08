// Schema for req.body
// exposure_duration
// met_activity_name
// met_activity_value
// relative_humidity
// air_speed
// air_temperature
// radiant_temperature
// clo_ensemble_name

import axios from "axios";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const interfaceResult = await axios
        .post(process.env.DB_URL, {
          name: "CBE Interface Test",
          description: "Prototype testing requests",
          reference_time: new Date(),
          output_freq: 60,
          options: {
            csvOutput: false,
            sensation_adaptation: false,
            sensation_coredTdt: false,
            ignore_segments: false,
            ignore_physiology: false,
            neutralSimulationOutput: false,
          },
          phases: [
            {
              start_time: 0,
              time_units: "minutes",
              ramp: false,
              end_time: req.body.exposure_duration,
              met_activity_name: req.body.met_activity_name,
              met: req.body.met_activity_value,
              default_data: {
                rh: req.body.relative_humidity / 100,
                v: req.body.air_speed,
                solar: 0,
                ta: req.body.air_temperature,
                mrt: req.body.radiant_temperature,
              },
              clo_ensemble_name: req.body.clo_ensemble_name,
            },
          ],
        })
        .then((result) => {
          let graphObject = [];
          for (let i = 0; i < req.body.exposure_duration; i++) {
            graphObject.push(result.data.results[i].overall);
          }
          return res.json(graphObject);
        });
    } catch (err) {
      console.log(err);
      return res.json({ success: false, error: err.response });
    }
  }
}
