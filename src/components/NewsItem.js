import React, { Component } from "react";
export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl,newsUrl,author,date, } = this.props;
        return (
            <div>
                <div className="card">
                    <img src={!imageUrl?" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_b9F7xfCjXbJfitt4kqhkmwhL8EBRwgKlfA&s":imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{!title?"I'm excited to announce that , marking a new chapter that I'm eager to share with everyone!":title.slice(0,50)}</h5>
                        {/* <span className=" box3 position-absolute top-0 start-100 translate-last badge rounded-pill bg-danger">Siddharth Tiwari</span> */}
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small class="text-body-secondary ">By {!author?"Unknown":author} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer"
                        >
                        <button className="box1 btn btn-dark">Read More </button>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewsItem;
