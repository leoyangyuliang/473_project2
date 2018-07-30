import React, { Component } from "react";

class AboutUs extends Component {
  render() {
    return (
      <div>
        <div class ="container">
          <div class ="main-content">

            <div class= "detail-image-container">
              <img class ="detail-image" data-image-role ="target" src ="images/otter1.jpg" atl =""></img>
              <span class="detail-image-title" data-image-role="title">Kevin Kheradvar</span>
            </div>

            <ul class="thumnail-list">

              <li class ="thumnail-item">
                <a her="images/otter1.jpg" data-image-role ="trigger" data-image-title ="Kevin Kheradvar" data-image-url ="images/otter1.jpg">
                <img class="thumbnail-image" src="images/otter1.jpg" alt=""></img>
                <span class="thumbnail-title">Kevin</span>
                </a>
              </li>

              <li class ="thumnail-item">
                <a href="images/otter2.jpg" data-image-role="trigger" data-image-title="Leo Yang" data-image-url="images/otter2.jpg">
                <img class="thumbnail-image" src="images/otter2.jpg" alt=""></img>
                <span class="thumbnail-title">Leo</span>
                </a>
              </li>

            
              <li class ="thumnail-item">
                <a href="images/otter2.jpg" data-image-role="trigger" data-image-title="Leo Yang" data-image-url="images/otter3.jpg">
                <img class="thumbnail-image" src="images/otter3.jpg" alt=""></img>
                <span class="thumbnail-title">Jerry</span>
                </a>
              </li>

                
              <li class ="thumnail-item">
                <a href="images/otter2.jpg" data-image-role="trigger" data-image-title="Leo Yang" data-image-url="images/otter4.jpg">
                <img class="thumbnail-image" src="images/otter4.jpg" alt=""></img>
                <span class="thumbnail-title">Henry</span>
                </a>
              </li>

              <li class ="thumnail-item">
                <a href="images/otter2.jpg" data-image-role="trigger" data-image-title="Leo Yang" data-image-url="images/otter5.jpg">
                <img class="thumbnail-image" src="images/otter5.jpg" alt=""></img>
                <span class="thumbnail-title">Sina</span>
                </a>
              </li>    

            </ul>

          </div>
        </div>
  
      </div>
    );
  }
}

export default AboutUs;
