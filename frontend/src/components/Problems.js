import React from 'react';

import OverBuying from "../assets/Problems.jpeg";
import Wastemoney from "../assets/wasted-money.jpg";
import Envimpact from "../assets/environment-impact.jpg";
import Hunger from "../assets/hunger.jpg";
import Resources from "../assets/resources.jpg";
import Community from "../assets/community.jpg";
import Sustainable from "../assets/sustainable.jpg";
import underline1 from "../assets/underline-heading.png";
import Arrow1 from "../assets/arrow1.png";
import Sun from "../assets/Highlight_05.png";
import Smallstars from "../assets/small-stars.png";
import Smallstars2 from "../assets/small-stars2.png";

const Problems = () => {
  return (
    <div id="problems">
      <div class="the-problems">
        <div class="problems-section1">
            <div class="heading-highlights">
                <img id="highlight-heading" src={Sun} alt="Sun Photo"/><h1 id="heading-problems">Why Was KindBasket <span className="created"> Created ? <img id="underline1" src ={underline1} alt = "underline"/></span></h1><img id="arrow1" src={Arrow1} alt="arrow"/>
                </div>          
            <div class="cards">
                <div class="card1">
                    <img id="WasteMoney" src={Wastemoney} alt ="Waste of Money photo"/>
                    <h1>Wasted Money</h1>
                    <p>We waste ₹92,000 crores/year on discarded food. Reducing waste saves money and supports businesses.</p></div>
                <div class="card2">
                    <img id="Envtimpact" src={Envimpact} alt="Environment Impact photo"/>
                    <h1>Environmental Impact</h1>
                    <p>Wasted food contributes to global CO₂. Reducing waste protects the environment.</p></div>
                <div class="card3">
                <img id="hunger" src={Hunger} alt="Poor hungry children photo"/>
                    <h1>Fighting Hunger</h1><p>While food is wasted, others go hungry. Reducing waste improves food security.</p></div>
                <div class="card4">
                <img id="resources" src={Resources} alt="Farming photo"/>
                    <h1>Efficient Resource Use</h1>
                    <p>Wasting food wastes water, energy, land. Minimizing waste supports sustainability.</p></div>
                <div class="card5">
                <img id="community" src={Community} alt="Community photo"/>
                    <h1>Community Responsibility</h1>
                    <p>Reducing waste shows we care for each other and the planet.</p></div>
                <div class="card6">
                <img id="sustainable" src={Sustainable} alt="Climate Protesters"/>
                <h1>Building a Sustainable Future</h1>
                    <p>Food waste reflects system inefficiencies. Addressing it builds a better future.</p></div>    
            </div>
        </div>
        <div class="collage">
            <img id="background-image" src={OverBuying} alt="Background Image"/>
        </div>
    </div>
    </div>
  );
};

export default Problems;
