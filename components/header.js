import React, {
  useRef,
  useState,
} from 'react';

// import { useState , useRef } from 'react/cjs/react.production.min';
import {
  signOut,
  useSession,
} from 'next-auth/client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useDetectOutsideClick } from './useDetectOutsideClick';

function Header() {
  const router = useRouter();
  const [session, loading] = useSession();
 
  const [name, setName] = useState([session?.user?.name]);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  return (
    <div style={{ background: "#31353d" ,   
    position: "fixed",
    width: "100%",
    zIndex:"999"
    }}>
      <Head>
        <title>Omra Solution</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="row" style={{ width: "100%" }}>
        <div className="col-4"> </div>
        <div className="col-4">
          {" "}
          <h1
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: "22px",
              padding: "15px 0px 1px",
            }}
          >
            Omra Solutions Process
          </h1>
        </div>
        <div className="col-4" style={{ textAlign: "right" }}>
          <div className="menu-container">
            <button onClick={onClick} className="menu-trigger">
              <span>{name}</span>
              <Image
                src="/image/Avatar.png"
                width={50}
                height={50}
                alt="User avatar"
              />
            </button>
            <nav
              ref={dropdownRef}
              className={`menu ${isActive ? "active" : "inactive"}`}
            >
              <ul>
                <li>
                  <a href="#">My Profile</a>
                </li>
                <li>
                  <a href="#">Seeting</a>
                </li>
                <li onClick={() => signOut()}>
                  <Link href="/auth/login">Logout</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* <div className={style.heading} style={{background:"#31353d"}}>
            <h1>Omra Solution</h1>
        </div> */}
    </div>
  );
}

export default Header;
