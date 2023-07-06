import React from "react";
import { Link } from "react-router-dom";

function PageBanner({ children, title, text, nav, img, cols, className }) {
  return (
    <section
      className={`page-banner padding40 ${className ? className : ""}`}
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="container ps-5">
        <div className="row">
          <div className={`col-12 ${cols ? cols : ""}`}>
            {title && <h1 className="font-2">{title}</h1>}
            {text && <p>{text}</p>}
            {nav && (
              <ul>
                <li>
                  <Link to="/">Home&nbsp;/&nbsp;</Link>
                </li>
                <li className="brown fw-semibold">{title}</li>
              </ul>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageBanner;
