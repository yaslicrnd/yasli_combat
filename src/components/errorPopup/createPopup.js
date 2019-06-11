import React from 'react'
import { hydrate } from 'react-dom'
import ErrorPopUp from './index'

export default function createPopUp (errorMessage) {
    let style = 'position: absolute; top:0; left:0; height: 100%; width: 100%; background: rgba(0,0,0,0.5)';
    const errorContainer = document.createElement('div');
    errorContainer.id = 'modal-error';
    errorContainer.style.cssText = style;
    const rootElement = document.getElementById("root");
    rootElement.appendChild(errorContainer);

    hydrate(<ErrorPopUp message={errorMessage}/>, errorContainer);
}