import React from "react";
import "./hero.css";
import img1 from "../../public/images./nuotrauka1.jpg";
// paveiksliukui stilius apsoliutus,
export default function Hero() {
  return (
    <div className="container">
      <div className="quarter ink">
        <img src={img1}></img>
        <div>
          <h1>Title</h1>
          <p>aprasymas</p>
          <button className="btn">MYGTUKAS</button>
        </div>
      </div>
      <div className="quarter">2ketvirtis</div>
      <div className="quarter">3 ketvirtis</div>
      <div className="quarter">4 ketvirtis</div>
    </div>
  );
}
