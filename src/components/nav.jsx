import React from "react";
import styles from "./nav.module.css";
import Table from "./table";
import { useState } from "react";

const Nav = ({ alCarpinteroSubTags, carpinteriaSubTags, subTags, products, handleNavClick, activeTag, tags }) => {
  return (
    <>
      <nav className={styles.navContainer}>


{/*               PINTURAS               */}


      <div className={styles.pinturasContainer}>
  <div className={styles.pinturas}>
    PINTURAS
    <div className={styles.subPinturasContainer}>
      {subTags.map((subtag) => (
        <button
          key={subtag}
          className={styles.subTags}
          onClick={() => handleNavClick(subtag)}
        >
          {subtag}
        </button>
      ))}
    </div>
  </div>
</div> 




{/*               CARPINTERIA               */}




 <div className={styles.carpinteria}>
    CARPINTERIA
    <div className={styles.subCarpinteriaContainer}>
      {carpinteriaSubTags.map((subtag) => (
        <button
          key={subtag}
          className={styles.subTags}
          onClick={() => handleNavClick(subtag)}
        >
          {subtag}
        </button>
      ))}
    </div>
  </div>

  


{/*               AL CARPINTERO               */}





<div className={styles.alCarpintero}>
AL CARPINTERO
    <div className={styles.subalCarpinteroContainer}>
      {alCarpinteroSubTags.map((subtag) => (
        <button
          key={subtag}
          className={styles.subTags}
          onClick={() => handleNavClick(subtag)}
        >
          {subtag}
        </button>
      ))}
    </div>
  </div>






{/*               TAGS NAV               */}

         
          {tags.map((tag) => (
          <button
            key={tag}
            className={styles.btns}
            onClick={() => handleNavClick(tag)}
          >
            {tag}
          </button>
             ))}
      </nav>

    </>
  );
};

export default Nav;


