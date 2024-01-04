import { useEffect, useState } from "react";
import Vote from "./componen/Vote";
import AddVote from "./componen/AddVote";
import ListVote from "./componen/ListVote";
import Web3 from "web3";
import { AdoptionContract, VotingContract } from "./utils";
//import "./App.css";

function App() {
  const [votes, setVotes] = useState([]);
  const [owner, setOwner] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [addVotingIsOpen, setAddVotingIsOpen] = useState(false);
  const [listVotingIsOpen, setListVotingIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState([]);
  const [balance, setBalance] = useState(0);
  const adoptionContract = AdoptionContract();
  const votingContract = VotingContract();

  useEffect(() => {
    document.title = "Voting Blockchain";
    getConnection();
    getAllVotes();
    getAllOwnerVotes();
    setIsLoading(false);
  }, []);

  const getConnection = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      const ballance = await web3.eth.getBalance(accounts[0]);

      setAccount(accounts);
      setBalance(ballance);
      setIsConnected(true);
    } else {
      console.log("no metamask");
    }
  };

  const getAllVotes = async () => {
    try {
      const gas = await votingContract.methods.Voting().estimateGas();
      const res = await votingContract.methods.Voting().call();

      // console.log(res);
      setVotes(res);
    } catch (error) {
    console.error('Error in getAllVotes:', error);
    }
  };

  const getAllOwnerVotes = async () => {
    try {
      const gas = await adoptionContract.methods.getAdopters().estimateGas();
      const data = await adoptionContract.methods.getAdopters().call();

      setOwner(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="row justify-content-center mt-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-4">
        <h1 className="text-center mb-4">Votes Adoption</h1>
        <AddVote
          isOpen={addVotingIsOpen}
          setIsOpen={setAddVotingIsOpen}
          account={account}
          getAllPets={getAllVotes}
        />
        <ListVote
          isOpen={listVotingIsOpen}
          setIsOpen={setListVotingIsOpen}
          pets={votes}
          account={account}
          getAllOwnerVotes={getAllOwnerVotes}
          getAllVotes={getAllVotes}
        />
        {isConnected ? (
          <>
            <div className="col">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-info dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  options
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setAddVotingIsOpen(true);
                      }}
                    >
                      Add Votes
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setListVotingIsOpen(true);
                      }}
                    >
                      Votes List
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <Vote
              account={account}
              balance={balance}
              Votes={votes}
              owner={owner}
              getAllOwnerVotes={getAllOwnerVotes}
            />
          </>
        ) : (
          <h1 className="text-center text-warning">
            Cannot connect to metamask please fix the connection and refresh the
            page again
          </h1>
        )}
      </div>
    </div>
  );
}

export default App;
