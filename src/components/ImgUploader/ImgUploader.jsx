import React from 'react'
import styles from "./ImgUploader.module.scss";


export default class ImgUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spotImgUrl: {}
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.removeImg = this.removeImg.bind(this);
    }
    
    handleChange(event) {
        if (event.target.files[0]) {
            
            if (event.target.files[0].size < 1000000) { // Check size < 1MB
                let newFile = event.target.files[0];
                let newUrl = URL.createObjectURL(event.target.files[0]);
                let newName = event.target.files[0].name;
                this.props.imgURLUpload(newName, newFile);
                console.log('in ImgUploader - newFile: ', newFile);
                this.setState(prevState => ({
                    spotImgUrl: { ...prevState.spotImgUrl, [newName]: newUrl }
                }));
               
            } else {
                alert("Erreur: Veuillez choisir une image plus petit que 1MB");
            }
        }
    }
    removeImg(event) {
        event.preventDefault();  // Stop the form from submitting since we’re handling that with AJAX.

        this.props.imgURLDelete(event.target.id.replace('btn', '')); // Enable to get key of the image in this.state.url
    

    }
    render() {
        return (
            <div className={styles.wrapper}>


                <span className={styles.myInput}>Ajouter une photo:<input onChange={this.handleChange} type='file' accept=".jpg,.jpeg,.png" name='image' /></span>

                <div className={styles.imgPreviewCol}>
                    {Object.entries(this.state.spotImgUrl).map(e =>
                        <div  key={e[0]} className={styles.inputFrame}>
                            <div className={styles.imgFrame}>
                                <img id={e[0]} className={styles.imgPrev} src={e[1]} />
                            </div>
                            <button className={styles.rmvBtn} id={`${e[0]}btn`} onClick={this.removeImg}>Supprimer</button>
                        </div>
                    )}
                </div>
            </div>

        );
    }
}
