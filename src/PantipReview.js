import React from "react";
import { connect } from "react-redux";

function PantipReview(props) {
    const { reviews } = props;

    const renderCard = (data) => {
        const { id, title, image_url } = data;

        return (
            <div key={id} className="col-lg-3 col-md-6 col-sm-6">
                <div className="card">
                    <div className="header" style={{ backgroundImage: `url(${image_url})` }}></div>
                    <div className="title">{title}</div>
                </div>
            </div>
        )
    }

    return (
        <div className="row">
            {reviews.map(item => renderCard(item))}
        </div>
    )
}


function mapStateToProps(state) {
    const { reviews } = state;
    return { reviews }
}
export default connect(mapStateToProps)(PantipReview);