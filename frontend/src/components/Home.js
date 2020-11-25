import React, { Fragment, Component } from 'react';
import { render } from 'react-dom';
import img from "./img.jpg"


export default function Home() {

    return (
      <Fragment>
        <div className="box cta">
          <p className="has-text-centered">
            <img
              src={img} 
              style={{
                aspectRatio : 1,
                width: '100%  ',
                height: undefined
              }}
            />

            <br></br>

          </p>
        </div>
      </Fragment>
    )
}
