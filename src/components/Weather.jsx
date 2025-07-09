import axios from 'axios';
import { useEffect, useState } from 'react';
import './Weather.scss';
import { getLatLngFromAddress } from './Map';
import { weathers } from './Weather.constants';

// https://apihub.kma.go.kr/apiList.do?seqApi=10#popup1

const myKey = '57f1b4a37d807494899a6d53175123c7';
// URL 변수
const apiUrl = (lat, lng) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${myKey}&units=metric`;

export default function Weather ({ address}) {
    const [data, setData] = useState();
    const { weather, main: temp, wind } = data || {};

    useEffect(() => {
       getLatLngFromAddress(address, ({ lat, lng }) => {
          const url = apiUrl(lat,lng);
          axios.get(url)
          .then(({ data: dt }) => {
              setData(dt);
          })
       })
    }, [address]);

    console.log(data);
    
    if (!data) return null;
    return <>
        <div id="weather" className="d-flex flex-column align-items-center p-4 gap-20">
            <div className="d-flex flex-column align-items-center gap-8">
                <small className="text-white text-nowrap">
                  <i className="fas fa-location-dot pe-2" />
                  {address}
                </small>
                <p className="h6 text-nowrap text-white">{weathers[weather[0].description]}</p>
                <p className="degree text-white text-nowrap">{Math.round(temp.temp)}</p>
            </div>
            <div className="d-flex weather-box gap-20">
                <div className="d-flex flex-column">
                  <small>습도</small>
                  <small>{temp.humidity}%</small>
                </div>
                <div className="d-flex flex-column">
                  <small>체감 온도</small>
                  <small>{temp.feels_like}℃</small>
                </div>
                <div className="d-flex flex-column">
                  <small>풍속</small>
                  <small>{wind.speed}㎧</small>
                </div>
            </div>
        </div>
    </>;
}