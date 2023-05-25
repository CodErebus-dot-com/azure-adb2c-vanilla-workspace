import Logo from "../../../public/Genesis_logo.svg";
import Illustration from "../../../public/OTP-Authentication-Security.svg";
import './SignInPage.css';

const SignInPage = () => {
  return (
    <div id="signin_container">
      <div id="background_branding_container" data-tenant-branding-background-color="true">
        <Illustration className='illustration' />
      </div>
      <div className="panel" id="panel">
        <table className="panel_layout" role="presentation">
          <tbody>
            <tr className="panel_layout_row">
              <td id="panel_left" />
              <td id="panel_center">
                <div className="inner_container">
                  <div className="api_container normaltext">
                    <Logo width="120" height="120" />
                    <div id="api" role="main"></div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SignInPage;
