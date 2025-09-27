const Footer = () => {
    const year = new Date().getFullYear();
  
    return (
      <footer>
        {" "}
        {`Developed by Chris Love, Daniel Rowe, Jason Lopez ${year}`}{" "}
      </footer>
    );
  };
  export default Footer;