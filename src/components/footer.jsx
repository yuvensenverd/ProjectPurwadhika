import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="black" style={{backgroundColor : "black"}} className="fixedfooter font-small pt-4 mt-4 ">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="2">
            <h5 className="navbartext pt-3">Logo</h5>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="navbartext pt-3 pb-3">Footer Content</h5>
            <div className="footertext">
              Here you can use rows and columns here to organize your footer
              content.
            </div>
          </MDBCol>
          <MDBCol md="6" className ="pl-5">
            <h5 className="navbartext pt-3">Links</h5>
            <ul>
              <li className="list-unstyled pt-2">
               <div className="mt-2 footertext">Link 1</div>
              </li>
              <li className="list-unstyled pt-2">
               <div className="mt-2 footertext">Link 2</div>
              </li>
              <li className="list-unstyled pt-2">
               <div className="mt-2 footertext">Link 3</div>
              </li>
              <li className="list-unstyled pt-2">
               <div className="mt-2 footertext">Link 4</div>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        {/* <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
        </MDBContainer> */}
      </div>
    </MDBFooter>
  );
}

export default FooterPage;