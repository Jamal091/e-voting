import ReactModal from "react-modal";
import { AdoptionContract, VotingContract } from "../utils/index";
import Voting from "./Vote";

const ListVote = ({
  isOpen,
  setIsOpen,
  account,
  votes,
  getAllOwnerVotes,
  getAllVotes,
}) => {
  const Adoptioncontract = AdoptionContract();
  const Votingcontract = VotingContract();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleResetOwner = async (e) => {
    try {
      const res = await Adoptioncontract.methods
        .revertOwnership(Number(e.target.value))
        .send({ from: String(account[0]) });

      getAllOwnerVotes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteVotes = async (e) => {
    try {
      const res = await Votingcontract.methods
        .deleteAnimalById(Number(e.target.value))
        .send({ from: String(account[0]) });

      getAllVotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ReactModal isOpen={isOpen}>
      <h1 className="text-center">Animals Data</h1>
      <hr />
      <br />
      <button className="btn btn-success" onClick={handleClose}>
        Close
      </button>
      <br />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr> */}
          {Voting.map((val, id) => {
            if (val.name == "") {
              return <></>;
            }

            return (
              <tr key={id}>
                <th scope="row">{id + 1}</th>
                <td>{val.name}</td>
                <td>{val.picture}</td>
                <td>
                  <button
                    style={{ marginRight: "10px" }}
                    className="btn btn-warning"
                    value={val.id}
                    onClick={handleResetOwner}
                  >
                    reset ownership
                  </button>
                  <button
                    className="btn btn-danger"
                    value={val.id}
                    onClick={handleDeleteVotes}
                  >
                    Delete Animal
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ReactModal>
  );
};

export default ListVote;
