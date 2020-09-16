import React from 'react'
import styles from "./ImgUploader.module.scss";


export default class ImgUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            url: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.removeImg = this.removeImg.bind(this);
    }
    handleChange(event) {
        if (event.target.files[0]) {
            let newUrl = URL.createObjectURL(event.target.files[0]);
            let newName = event.target.files[0].name;
            this.setState(prevState => ({
                url: { ...prevState.url, [newName]: newUrl }
            }));
        }


        // this.setState({
        //     file: event.target.files[0],
        //     url: URL.createObjectURL(event.target.files[0])
        // })

    }
    removeImg(event) {
        event.preventDefault();  // Stop the form from submitting since we’re handling that with AJAX.

        let urlId = event.target.id.replace('btn', ''); // Enable to get key of the image in this.state.url
        let newUrlObj = new Object;
        newUrlObj = this.state.url;
        delete newUrlObj[urlId];
        this.setState({ url: newUrlObj });

    }
    render() {
        return (
            <div>
                <input onChange={this.handleChange} type='file' name='image' />
                <div>
                    {Object.entries(this.state.url).map(e =>
                        <div className={styles.imgPreviewCol}>
                            <img id={e[0]} className={styles.imgPrev} src={e[1]} />
                            <button id={`${e[0]}btn`} onClick={this.removeImg}>Remove</button>
                        </div>
                    )}
                </div>
            </div>

        );
    }
}
