import './reset.css';
import './App.css';
import Map from './images/map-smaller.png'
import React, { useRef, useState } from 'react';
import CompanyInfo from './CompanyInfo';

function App() {
  const companies = {
    adidas: {
      name:'Adidas',
      description:'Немецкая транснациональная компания по производству спортивной одежды, обуви и аксессуаров',
      imgUrl:'https://retail-loyalty.org/upload/iblock/8cf/0392f9ab5ad58e9ec6e6d0d351d41f41.JPG',
    },
    nike: {
      name:'Nike',
      description:'Американская транснациональная компания, специализирующаяся на спортивной одежде и обуви',
      imgUrl:'https://trademaster.ua/im/pics/912054-1.jpg',
    }

  }


  const mapInner = useRef();

  const [dots, setDots] = useState([]);
  const [mapScale, setMapScale] = useState(1);
  const [isContextMenu, setIsContextMenu] = useState(false);
  const [locationContextMenu, setLocationContextMenu] = useState({
    left:0,
    top:0
  });
  const [selectedDot, setSelectedDot] = useState();
  const [selectedCompany, setSelectedCompany] = useState({});
  const [isCompanyInfo, setIsCompanyInfo] = useState(false);
  

  const increaseScale = () => {
    let currentMapScale = mapScale + 0.2;
    setMapScale(currentMapScale);
    
  }

  const reduceScale = () => {
    let currentMapScale = mapScale - 0.2;
    setMapScale(currentMapScale);
    
  }

  const getClickLocation = (clickedBlock, evt) => {
    const blockPosition = clickedBlock.getBoundingClientRect();
    const x = Math.round(evt.clientX - blockPosition.left) +'px';
    const y = Math.round(evt.clientY - blockPosition.top) +'px';
    return {
      x: x,
      y: y
    }
  }
  


  const addDot = (evt) => {

    if (!evt.target.classList.contains('context-menu__item') && !evt.target.classList.contains('dot')) {  
      let dotColor = 'blue';
      const dotLocation = getClickLocation(mapInner.current, evt);
      const dotId = dots.length;

      const dot = {
        id: dotId,
        backgroundColor: dotColor,
        top: dotLocation.y,
        left: dotLocation.x
      }

        setDots(dots.concat(dot));
    }
    setIsContextMenu(false);
  }

  const showContextMenu = (evt) => {
    evt.preventDefault();

    if (evt.target.classList.contains('dot')) {
      const currentDot = evt.target;
      const clickLocation = getClickLocation(mapInner.current, evt);
    
      let currentLocation = {
        left:clickLocation.x,
        top:clickLocation.y
      }
  
      setLocationContextMenu(currentLocation);
      setIsContextMenu(true);
      setSelectedDot(currentDot);

    }
  }

  const changeDotColor = (evt) => {
    let dotBg = ''

    if (evt.target.classList.contains('red')) {
      dotBg = 'red';
    } else if (evt.target.classList.contains('green')) {
      dotBg = 'green';
    }

    let currentDotsArr = dots;
    let selectedDotId = selectedDot.dataset.id;

    currentDotsArr[selectedDotId].backgroundColor = dotBg;

    setDots(currentDotsArr);

  }

  const showCompanyInfo = (evt) => {
    const currentCompanyName = evt.target.dataset.company;
    const currentCompanyObj = companies[currentCompanyName];
    setSelectedCompany(currentCompanyObj);
    setIsCompanyInfo(true);
  }



  return (
    <div className="App">
      <div className="content-container">
        <div className="map-outer" >
        <div className="btns-container">
          <button onClick ={increaseScale} className = 'btn-scale' >+</button>
          <button onClick ={reduceScale} className = 'btn-scale'>-</button>
        </div>
          <div className="map-inner" style = {{transform:`scale(${mapScale})` }} ref = {mapInner} onClick ={addDot}  onContextMenu = {showContextMenu}>
            <img className = 'map-img' style = {{transform:`scale(${mapScale})` }} src={Map} alt="" />
            <svg style = {{transform:`scale(${mapScale})` }} viewBox = "0 0 1333 794">
              <path className = 'company company-1' data-company = 'adidas' onClick = {showCompanyInfo} d = 'm 130.0154,136.85832 221.71047,-1.36859 1.36859,176.54723 -57.4805,-1.36858 1.36859,97.1694 H 128.64682 l 1.36858,-113.5924 h -17.79158 l 1.36858,20.52875 -72.534905,-2.73717 V 236.76489 H 113.5924 v 12.31725 h 15.05442 z' />
              <path className = 'company company-2' data-company = 'nike' onClick = {showCompanyInfo} d = 'M 369.51745,139.59548 H 488.58419 V 68.429158 l 27.37166,-28.740246 49.269,-1.368583 27.37166,31.477412 V 138.2269 h 24.6345 V 312.03696 H 369.51745 Z' />

            </svg>

            {dots.map((dot, index) => 
              <div className="dot" data-id = {dot.id} style = {{left: dot.left, top: dot.top, backgroundColor: dot.backgroundColor}} key = {index}></div>
            )}

            {isContextMenu &&
              <ul className="context-menu" style = {locationContextMenu}>
                  <li className="context-menu__item red" onClick = {changeDotColor}>Красная точка</li>
                  <li className="context-menu__item green" onClick = {changeDotColor}>Зеленая точка</li>
              </ul>
            }

          </div>
        </div>
 
          <CompanyInfo showCompanyInfo = {isCompanyInfo} selectedCompany = {selectedCompany}/>
      </div>
    </div>
  );
}

export default App;
