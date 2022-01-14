import { uploadImages } from "../../utils/ImageService";
import formStyles from "./SectionForms.module.css";
import FileBase64 from 'react-file-base64';

const PhotoUpload = ({photos, setPhotos}) => {

    return (
        <div className={formStyles.photoUpload}>
            {(photos.length > 0) ? 
            <div>
                <div className={formStyles.imagesContainer}>
                    {photos.map((photo) => <img src={photo}></img>)}
                </div>
                <label>
                    <p className={formStyles.uploadButton}>Upload More Photos</p>
                    <FileBase64 multiple={true} onDone={e => uploadImages(e, photos, setPhotos)}/>
                </label>
                <p onClick={() => setPhotos([])} className={formStyles.clearButton}>Clear</p>
            </div> :
            <label className={formStyles.photoInput}>
                <FileBase64 multiple={true} onDone={e => uploadImages(e, photos, setPhotos)}/>
                <p className={formStyles.uploadButton}>Upload Photos</p>
                <p className={formStyles.photosDisclaimer}>+Add at least 3 photos</p>
            </label>}
        </div>
    );
}

export default PhotoUpload;