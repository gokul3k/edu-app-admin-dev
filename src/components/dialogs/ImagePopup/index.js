import React from 'react'
import ModalImage from "react-modal-image";

export default function ImagePopup(small,large,alt) {
    return (
<ModalImage
  small={small}
  large={large}
  alt={alt}
/>
    )
}
