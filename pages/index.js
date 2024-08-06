import React, { useEffect, useContext, useState } from "react";

//INTERNAL IMPORT
import { CryptoPredictionContext } from "../Context/CryptoPredictor";
import { Hero, Card, PupUp } from "../Components";
const index = () => {
  const {
    titleData,
    getPredictions,
    createPrediction,
    stake,
    getUserPredictions,
    getStakes,
    gasLimit,
    currentAccount,
  } = useContext(CryptoPredictionContext);

  const [allprediction, setAllprediction] = useState();
  const [userprediction, setUserprediction] = useState();

  useEffect(() => {
    const getStakesData = getStakes();
    const userPredictionsData = getUserPredictions();
    return async () => {
      const allData = await getStakesData;
      const userData = await userPredictionsData;
      setAllprediction(allData);
      setUserprediction(userData);
    };
  }, [currentAccount]);

  //stake POPUP MODEL
  const [openModel, setOpenModel] = useState(false);
  const [stakePrediction, setPricePrediction] = useState();

  console.log(stakePrediction);
  return (
    <>
      <Hero titleData={titleData} createPrediction={createPrediction} />
      
      <Card
        title="Your Created Predictions"
        allprediction={userprediction}
        setOpenModel={setOpenModel}
        setPrice={setPricePrediction}
      />

      {/* {openModel && (
        <PupUp
          setOpenModel={setOpenModel}
          getStakes={getStakes}
          stake={stakePrediction}
          stakeFunction={stake}
        />
      )} */}
    </>
  );
};

export default index;
