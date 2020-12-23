import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import './styles.css';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


export default function ListRow({title, imgSrc, items, path}) {

  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let horizontalScroll = scrollX + Math.round(window.innerWidth / 2);
    if(horizontalScroll > 0) {
      horizontalScroll = 0;
    }
    setScrollX(horizontalScroll);
  }

  const handleRightArrow = () => {
    let horizontalScroll = scrollX - Math.round(window.innerWidth / 2);
    let listWidth = items.length * 200;
    if((window.innerWidth - listWidth) > horizontalScroll) {
      horizontalScroll = (window.innerWidth - listWidth) - 60;
    }
    setScrollX(horizontalScroll);
  }

  return (
    <div className="listRow">
      <strong>{title}</strong>
      <div className="listRow-left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{fontSize: 50}}/>
      </div>
      <div className="listRow-right"onClick={handleRightArrow}>
        <NavigateNextIcon style={{fontSize: 50}}/>
      </div>
      <div className="listRow-listarea">
        <div className="listRow-list" style={{
          marginLeft: scrollX,
          width: items.length * 200
        }}>
          {items.length > 0 && items.map((item, key) => (
            <Link key={key} to={{
              pathname: "/detail",
              pathInfo: `${path}/${key + 1}`,
              imgSrc: imgSrc
            }}>
              <div className="listRow-item" key={key}>
                <span>{item.name}</span>
                <img src={`/${imgSrc}/${item.name || item.title}.png`} onError={(e) => e.target.src=`/${imgSrc}/avatar-icon.png`} alt={item.name || item.title} />
              </div>
            </Link>
              ))}
        </div>
      </div>
    </div>
  );
}

