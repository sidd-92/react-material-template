import React from "react";
import "./App.css";
import { MDBTypography, MDBBox } from "mdbreact";

function App() {
  return (
    <div>
      <MDBTypography tag="h3">
        <strong>Fancy display heading </strong>
        <small className="text-muted">with faded secondary text</small>
      </MDBTypography>
      <>
        <MDBTypography tag="h5">
          <MDBBox tag="u">Lead</MDBBox>
        </MDBTypography>
        <MDBBox tag="p" className="lead">
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          Duis mollis, est non commodo luctus.
        </MDBBox>

        <br />
        <MDBTypography tag="h5">
          <MDBBox tag="u">Regular paragraph</MDBBox>
        </MDBTypography>
        <MDBBox tag="p">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
          tenetur sit voluptatem molestias ad neque veritatis! Alias natus,
          nobis laudantium, veritatis, atque illum ipsam nisi voluptas nesciunt
          harum laborum perspiciatis!
        </MDBBox>
      </>
    </div>
  );
}

export default App;
