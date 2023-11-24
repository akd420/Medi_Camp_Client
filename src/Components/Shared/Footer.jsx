import {
    FaFacebook,
    FaInstagram,
    FaTwitch,
    FaTwitter,
  } from "react-icons/fa";
  const Footer = () => {
    return (
      <div className="bg-red-200 bg-opacity-50 backdrop-blur-lg">
        <footer className="footer p-10 max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-start">
          <aside className="flex items-center gap-2 flex-col md:flex-row">
            <img className="w-4/12 md:w-2/12 mr-3" src="/logo.png" alt="" />
            <div>
            <p className="text-2xl lg:text-4xl ">
              Wander
              <span className="font-semibold text-rose">
                land
              </span>
              <br />
              Organizing Relaiable Camps Since 1965
            </p>
            </div>
          </aside>
          <nav className="flex flex-col items-center">
            <header className="text-2xl lg:text-4xl mb-1 lg:mb-5">
              Social{" "}
              <span className="font-semibold text-rose">
                Links
              </span>
            </header>
            <div className="grid grid-flow-col gap-4 text-3xl text-rose">
              <a>
                <FaFacebook></FaFacebook>
              </a>
              <a>
                <FaTwitter></FaTwitter>
              </a>
              <a>
                <FaTwitch></FaTwitch>
              </a>
              <a>
                <FaInstagram></FaInstagram>
              </a>
            </div>
          </nav>
        </footer>
      </div>
    );
  };
  
  export default Footer;
  