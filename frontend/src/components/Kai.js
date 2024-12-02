import React from 'react';

const Kai = () => {
  return (
    <section class="collection bg-light position-relative py-5">
    <div className="container">
      <div className="row">
        <div className="title-xlarge text-uppercase txt-fx domino"></div>
        <div className="collection-item d-flex flex-wrap my-5">
          <div className="col-md-6 column-container">
            <div className="image-holder">
              <img src="./myotherimages/dance.gif" alt="dog dancing"
                className="product-image img-fluid" />
            </div>
          </div>
          <div className="col-md-6 column-container bg-white">
            <div className="collection-content p-5 m-0 m-md-5">
              <h3 className="element-title text-uppercase">Kai Quach</h3>
              <p>Computer Science Major, Junior</p>
              <br />
              <br />
              <hr />
              <p>COM S 319 Construction of User Interfaces, Fall 2024</p>
              <p>kaiq@iastate.edu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Kai;