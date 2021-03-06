import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

function UserSidebar() {
  return (
    <div className="container">
      <Head>
        <title>Omra Solution</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page-wrapper chiller-theme toggled">
        <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
          <i className="fas fa-bars"></i>
        </a>
        <nav id="sidebar" className="sidebar-wrapper">
          <div className="sidebar-content">
            <div className="sidebar-brand">
              <Image
                src="/image/cropped-Omra_Branding_logo.png"
                width={50}
                height={50}
              />
              {/* <div id="close-sidebar">
          <i className="fas fa-times"></i>
        </div> */}
            </div>

            <div className="sidebar-menu">
              <ul>
                <li className="header-menu">
                  <span>General</span>
                </li>
                {/* <li className="sidebar-dropdown">
                  <a href="#">
                    <i className="fa fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                    <span className="badge badge-pill badge-warning"></span>
                  </a>
                </li> */}
                <li className="header-menu">
                  <span>V1 - Process</span>
                </li>
                <li>
                <Link href="/process/v1process/Submission-form">
                  <a >
                    <i className="fa fa-book"></i>
                    <span>v1-Form</span>
                  </a>
                </Link>
                </li>
                {/* <li>
                  <a href="#">
                    <i className="fa fa-calendar"></i>
                    <span>DocId Created</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-folder"></i>
                    <span>DocId Approved</span>
                  </a>
                </li> */}
                <li className="header-menu">
                  <span>S1 - process</span>
                </li>
                <li>
                <Link href="/process/s1process/addprocess">
                  <a >
                    <i className="fa fa-book"></i>
                    <span>S1-Form</span>
                  </a>
                </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="sidebar-footer">
            <h3>OMRA SOLUTION</h3>
            {/* <a href="#">
        <i className="fa fa-bell"></i>
        <span className="badge badge-pill badge-warning notification">3</span>
      </a>
      <a href="#">
        <i className="fa fa-envelope"></i>
        <span className="badge badge-pill badge-success notification">7</span>
      </a>
      <a href="#">
        <i className="fa fa-cog"></i>
        <span className="badge-sonar"></span>
      </a>
      <a href="#">
        <i className="fa fa-power-off"></i>
      </a> */}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default UserSidebar;
