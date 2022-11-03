import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import convert from 'xml-js';

dotenv.config();
export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ['content-type', 'authorization'],
  })
);

app.get('/api/trains/:station', async (req, res) => {
  const { station } = req.params;

  try {
    const trainsResponse = await axios.get(
      `http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=${station}`
    );
    const trainsJSON = convert.xml2json(trainsResponse.data, {
      compact: true,
      spaces: 4,
    });

    const trains = JSON.parse(trainsJSON);
    const nextTrains = trains.ArrayOfObjStationData.objStationData.slice(0, 2);

    res.status(200).send(nextTrains);
  } catch (e) {
    console.log('ERROR', e);
  }
});
