import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import fetchPet from "./fetchPet";
import Carousel from "./carousel";
import ErrorBoundary from "./ErrorBoundary";
import { useContext, useState } from "react";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";


const Details = () => {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const results = useQuery(["details", id], fetchPet);
    const navigate = useNavigate();
    const [, setAdoptPet] = useContext(AdoptedPetContext)

    if (results.isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">😀</h2>
            </div>
        )
    }


    const pet = results.data.pets[0];

    return (
        <div className="details">
            <Carousel images={pet.images} />
            <div>
                <h1>{pet.name}</h1>
                <h2>
                    {pet.animal} - {pet.breed}, {pet.state}
                    <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
                    <p>{pet.description}</p>
                    {
                        showModal ? (
                            <Modal>
                                <div>
                                    <h1>Would you like to adpot {pet.name}</h1>
                                    <button onClick={() => { setAdoptPet(pet); navigate("/") }}>Yes</button>
                                    <button onClick={() => setShowModal(false)}>No</button>
                                </div>
                            </Modal>
                        ) : null
                    }
                </h2>

            </div>
        </div>
    )
}

const ErrorBoundaryDetails = () => {
    return (
        <ErrorBoundary >
            <Details />
        </ErrorBoundary >
    )
}

export default ErrorBoundaryDetails;


