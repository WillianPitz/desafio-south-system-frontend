import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import gif from '../../assets/loading.gif';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import './styles.css';

import Swapi from '../../services/Swapi';
import Header from '../../components/Header';

export default function Detail(props){

  const [itemDetail, setItemdetailInfo] = useState([]);

  useEffect(()=> {
    const loadDetailList = async () => {
      let detailInfo = await Swapi.getDetailInfo(props.location.pathInfo);
      setItemdetailInfo(detailInfo[0].items)
    }

    loadDetailList();
  }, []);

  return (
    <>
      <Header />

      <div className="detailContainer">
        <div className="infoBox">
        {itemDetail.length <= 0 &&
          <div className="loading">
            <div className="loadingText">
              <strong>Loading...</strong>
            </div>
              <img src={gif} alt="loading-gif" />
          </div>
        }
        {Object.keys(itemDetail).slice(0, 5).map((key) => (
          <div key={key} className="infoItem">
            <span>{key}:</span>
            <span>{itemDetail[key]}</span>
          </div>
          ))}
        </div>
        <div className="detailImage">
          <img src={`/${props.location.imgSrc}/detail/${itemDetail.name || itemDetail.title}.png`} onError={(e) => e.target.src=`/${props.location.imgSrc}/detail/avatar-icon.png`} alt={itemDetail.name || itemDetail.title} />
        </div>

      </div>
        <Link to="/">
        <button className="backIcon">
          <KeyboardBackspaceIcon style={{ fontSize: 30}} />
            <span>Voltar</span>
        </button>
        </Link>
    </>
  );
}