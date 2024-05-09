import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query"
import Results from "./Results.jsx";
import useBreedList from "./useBreedList.js";
import fetchSearch from "./fetchSearch.js";
import AdoptedPetContext from "./AdoptedPetContext.jsx";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: "",
    })
    const [animal, setAnimal] = useState("");
    const [breeds] = useBreedList(animal);
    const results = useQuery(["search", requestParams], fetchSearch)
    const pets = results?.data?.pets ?? []
    const [adoptedPet] = useContext(AdoptedPetContext);

    return (
        <div className='search-params'>
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const obj = {
                    animal: formData.get("animal") ?? "",
                    breed: formData.get("breed") ?? "",
                    location: formData.get("location") ?? "",
                }

                setRequestParas(obj)
            }} >
                {
                    adoptedPet ? (
                        <div className="pet image-container">
                            <img src={adoptedPet.images[0]} alt="adopted pet" />
                        </div>
                    ) : null
                }
                <label htmlFor='location'>
                    Locations
                    <input
                        name="location"
                        id='location'
                        placeholder='Location'
                    />
                </label>
                <label htmlFor='animal'>
                    Animal
                    <select
                        id='animal'
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
                        }}
                    >
                        <option />
                        {ANIMALS.map((animal) => (
                            <option key={animal}>{animal}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor='breed'>
                    Breed
                    <select
                        id='breed'
                        disabled={breeds.length === 0}
                        name="breed"
                    >
                        {breeds.map((breed) => (
                            <option key={breed}>{breed}</option>
                        ))}
                    </select>
                    <button>Submit</button>
                </label>
            </form>
            <Results pets={pets} />
        </div >
    );
};

export default SearchParams;
