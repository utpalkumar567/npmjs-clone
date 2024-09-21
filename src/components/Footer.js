import React from "react";

const Footer = () => {
  return (
    <div className="flex w-full justify-between px-20 border border-t-2 pt-4">
      <div>
        <h1 className=" font-bold text-xl">Support</h1>
        <ul>
          <li>Help</li>
          <li>Advisories</li>
          <li>Status</li>
          <li>Contact npm</li>
        </ul>
      </div>
      <div>
        <h1 className=" font-bold text-xl">Company</h1>
        <ul>
          <li>About</li>
          <li>Blog</li>
          <li>Press</li>
        </ul>
      </div>
      <div>
        <h1 className=" font-bold text-xl">Term & Policies</h1>
        <ul>
          <li>Policies</li>
          <li>Term of use</li>
          <li>Code of Conduct</li>
          <li>Privacy</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
