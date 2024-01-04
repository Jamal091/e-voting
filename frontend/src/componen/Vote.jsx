import React from "react";
import { AdoptionContract } from "../utils/index"; // Ganti AdoptionContract dengan VotingContract

const Voting = ({ account, balance, Votes, owner, getAllOwnerVotes }) => {
  const contract = AdaptionContract();
  const nullVal = "0x0000000000000000000000000000000000000000";

  const handleVote = async (e) => {
    try {
      const gas = await contract.methods
        .vote(Number(e.target.value))
        .estimateGas();
      const res = await contract.methods
        .vote(Number(e.target.value))
        .send({ from: String(account[0]) });

      getAllOwnerVotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h5 className="text-center">Account : {account[0]}</h5>
      <h5 className="text-center">Account balance : {balance}&</h5>
      <br />
      {Voting.map((val, id) => {
        if (val.name === "") {
          return <React.Fragment key={id}></React.Fragment>;
        }

        return (
          <div className="col mt-3 mb-2" key={id}>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={`images/${val.picture}`}
                className="card-img-top"
                alt="test"
              />
              <div className="card-body">
                <h5 className="card-title">{val.name}</h5>
                {owner[Number(val.id)] === nullVal ? (
                  <button
                    value={val.id}
                    onClick={handleVote}
                    className="btn btn-primary"
                  >
                    Vote
                  </button>
                ) : (
                  <button className="btn btn-success disabled">
                    Already Voted
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Voting;
