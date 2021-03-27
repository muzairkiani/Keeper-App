import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year}</p>
      <p>Muhammad Uzair Kiani</p>
    </footer>
  );
}

export default Footer;
