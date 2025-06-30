import axios from 'axios';
import { useEffect } from 'react';
import './Weather.scss';

// https://apihub.kma.go.kr/apiList.do?seqApi=10#popup1

const myKey = 'GZVceKSNQH-VXHikjbB_EA';
// URL 변수
const apiUrl = `https://apihub.kma.go.kr/api/typ01/url/fct_shrt_reg.php?tmfc=0&authKey=${myKey}`;

// URL을 파싱하여 hostname, path 등을 추출
const url = new URL(apiUrl);
const options = {
  hostname: url.hostname,
  port: url.port,
  path: url.pathname + url.search,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const icons = {
  SUN: 'fas fa-sun',
  CLOUDSUN: 'fas fa-cloud-sun',
  CLOUD: 'fas fa-cloud',
  RAINY: 'fas fa-cloud-showers-heavy'
};


export default function Weather () {

    const address = '서울시 강남구';
    const date = '08/17';
    const wt = {
      degree: 27
    };

    useEffect(() => {
        // axios.get(apiUrl, options)
        // .then(data => {
        //     console.log(data);
        // })
    }, [])
    
    return <>
        <div id="weather" className="d-flex align-items-center border-radius-20 p-3 ps-4 pe-4">
            <div className="ps-3 pe-3 text-center">
              <p className="text-white">Partly Cloudy</p>
              <p className="degree text-white">{wt.degree}</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between flex-grow">
                <div>
                    <p className="h6 text-white">{address}</p>
                    <small className="text-white">Today, {date}</small>
                </div>
                <i className={`text-white ${icons.CLOUD}`} style={{ fontSize: 50}} />
            </div>
          
        </div>
    </>;
}