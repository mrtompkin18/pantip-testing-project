import React, { useEffect } from 'react';

import { connect } from "react-redux";
import { fetchReview } from "./api/review.api";

import { addReview } from "./action/review.action";

import PantipReview from "./PantipReview";
import SearchTopic from "./SearchTopic";

import './App.css';

function App(props) {
  const [loading, setLoading] = React.useState(true);

  const fectchData = async () => {
    const { addReview } = props;
    await fetchReview().then(({ data }) => {
      addReview(data.data)
      setLoading(false);
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    fectchData();
  }, []);

  if (loading) return <h1 className="loading">กำลังดึงข้อมูล....</h1>

  return (
    <div className="container p-4">
      <PantipReview />
      <SearchTopic />
    </div>
  );
}

export default connect(null, { addReview })(App);
