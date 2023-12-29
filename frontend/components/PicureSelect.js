import { useState } from "react";

export default function PictureSelect() {
  const [selectedPicture, setSelectedPicture] = useState(false);

  const handleClick = (selectionId) => {
    setSelectedPicture(selectionId);
  }

  return (
    <div className="picture-form">
      <div className={`picture element ${selectedPicture ? 'selected' : ''}`} onClick={() => handleClick(`pic_1`)}>
        <img
          src="profile_1.png"
          alt='profile_picture'
          width={100}
          height={100}
        />
      </div>
      <div className={`picture element ${selectedPicture ? 'selected' : ''}`} onClick={() => handleClick(`pic_1`)}>
        <img
          src="profile_2.png"
          alt='profile_picture'
          width={100}
          height={100}
        />
      </div>
      <div className={`picture element ${selectedPicture ? 'selected' : ''}`} onClick={() => handleClick(`pic_1`)}>
        <img
          src="profile_3.png"
          alt='profile_picture'
          width={100}
          height={100}
        />
      </div>
      <div className={`picture element ${selectedPicture ? 'selected' : ''}`} onClick={() => handleClick(`pic_1`)}>
        <img
          src="profile_4.png"
          alt='profile_picture'
          width={100}
          height={100}
        />
      </div>
      <div className={`picture element ${selectedPicture ? 'selected' : ''}`} onClick={() => handleClick(`pic_1`)}>
        <img
          src="profile_5.png"
          alt='profile_picture'
          width={100}
          height={100}
        />
      </div>
    </div>
  )
}
