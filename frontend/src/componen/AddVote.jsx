import { useRef } from "react";
import ReactModal from "react-modal";
import { VotingContract } from "../utils/index";

const AddVote = ({ isOpen, setIsOpen, account = null, getAllVotes = () => [] }) => {
  const votingName = useRef();
  const votingType = useRef();
  const contract = new VotingContract();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = votingName.current.value;
    const type = votingType.current.value;

    try {
      const gas = await contract.methods.addVote(name, type).estimateGas();
      const res = await contract.methods
        .addVote(name, type)
        .send({ from: String(account[0]), gas: gas });

      console.log(res);
      getAllVotes();
    } catch (error) {
      console.error(error);
    }
  };

  const handelClose = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <ReactModal isOpen={isOpen}>
      <h1 className="text-center">Add Vote</h1>
      <hr />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name Vote
          </label>
          <input
            type="text"
            ref={votingName}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            ref={votingType}
            aria-label="Default select example"
          >
            <option value="Silahkan Pilih" disabled>Silahkan Pilih</option>
            <option value="pdi.png">PDI</option>
            <option value="psi.png">PSI</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
        >
          Submit
        </button>
        <button className="btn btn-primary" onClick={handelClose}>
          close
        </button>
      </form>
    </ReactModal>
  );
};

export default AddVote;
