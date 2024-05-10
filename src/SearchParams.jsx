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
        <div className='my-0 mx-auto w-11/12'>
            <form
                className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
                onSubmit={(e) => {
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
                        type='text'
                        name="location"
                        id='location'
                        className="search-input"
                        placeholder='Location'
                    />
                </label>
                <label htmlFor='animal'>
                    Animal
                    <select
                        id='animal'
                        className="search-input"
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
                        className="search-input grayed-out-disable "
                        disabled={breeds.length === 0}
                        name="breed"
                    >
                        <option />
                        {breeds.map((breed) => (
                            <option key={breed}>{breed}</option>
                        ))}
                    </select>
                </label>
                <button className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500">Submit</button>
            </form>
            <Results pets={pets} />
        </div >
    );
};

export default SearchParams;
