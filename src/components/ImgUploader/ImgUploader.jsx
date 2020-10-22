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
            if (event.target.files[0].size < 2000000) { // Check size < 1MB
                let newFile = event.target.files[0];
                let newUrl = URL.createObjectURL(event.target.files[0]);
                let newName = event.target.files[0].name;

                this.props.imgURLUpload(newFile);
                this.setState(prevState => ({
                    spotImgUrl: { ...prevState.spotImgUrl, [newName]: newUrl }
                }));
            } else {
                alert("Erreur: Veuillez choisir une image plus petit que 2MB");
            }
        }
    }

    removeImg(event) {
        event.preventDefault();  // Stop the form from submitting since we’re handling that with AJAX.
        let myImg = event.target.id.replace('btn', ''); // Enable to get id of the associated image
        this.props.imgURLDelete(myImg);

        // Remove at the imgUploader level
        let newObj = {};
        newObj = this.state.spotImgUrl;
        delete newObj[myImg];
        this.setState({ spotImgUrl: newObj });
    }


    render() {
        return (
            <div className={styles.wrapper}>
                <span className={styles.myInput}>Ajouter une photo:<input onChange={this.handleChange} type='file' accept="image/*" name='image' /></span>
                <div className={styles.imgPreviewCol}>
                    {Object.entries(this.state.spotImgUrl).map(e =>
                        <div key={e[0]} className={styles.inputFrame}>
                            <div className={styles.imgFrame}>
                                <img id={e[0]} className={styles.imgPrev} src={e[1]} alt=''/>
                            </div>
                            <button className={styles.rmvBtn} id={`${e[0]}btn`} onClick={this.removeImg}>Supprimer</button>
                        </div>
                    )}
                </div>
            </div>

        );
    }
}
