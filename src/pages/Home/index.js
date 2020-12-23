import React, { useEffect, useState } from 'react';

import './styles.css';
import Swapi from '../../services/Swapi';
import ListRow from '../../components/ListRow';
import Header from '../../components/Header';

import gif from '../../assets/loading.gif';

export default function Home() {

  const [homeList, setHomeList] = useState([]);

  useEffect(()=> {
    const loadAll = async () => {
      let list = await Swapi.getHomeList();
      setHomeList(list)
    }

    loadAll();
  }, []);

  return (
    <>
      <Header />

      <div>
        <section>
          {homeList.map((item, key) => (
            <ListRow key={key} title={item.title} items={item.items} imgSrc={item.imgSrc} path={item.path}
            />
          ))}
        </section>

        {homeList.length <= 0 &&
          <div className="loading">
            <div className="loadingText">
              <strong>Loading...</strong>
            </div>
              <img src={gif} alt="loading-gif" />
          </div>
        }

      </div>
    </>
  );
}