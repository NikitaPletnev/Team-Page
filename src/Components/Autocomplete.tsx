import React, {useState} from 'react';
import {DataInterface} from "../Interfaces/DataInterface";
import '../Styles/autocomplete.css'

interface AutocompleteInterface {
    teamData: DataInterface[] | null | undefined
    teamAdded: DataInterface[];

    setAddDropdown(addDropDown: boolean): void;

    changeTeam(teamAdded: DataInterface[]): void;
}


const Autocomplete = ({teamData, setAddDropdown, teamAdded, changeTeam}: AutocompleteInterface) => {

    const [team, setTeam] = useState<DataInterface[] | null | undefined>(teamData)

    const setListBySearch = (value: string) => {
        if (!value?.length) {
            setTeam(teamData);
        }
        if (!!team && !!teamData) {
            setTeam(teamData.filter((opt) => {
                return opt.username.includes(value)
            }))
        }
    }

    const renderElements = () => {
        if (!team?.length) {
            return <div className='messageOfSearch'>
                <p>Team member not found</p>
                <p>Maybe she/he is not yet in your <span>team</span></p>
            </div>
        }
        return team?.map((opt: DataInterface) => {
            if(!teamAdded.find((el) => el.username === opt.username)){
                return (<div className='autocompleteItem' key={opt.username}>
                    <img className='autocompleteItemIcon' src={require(`../Icons/${opt.picture}`)} alt={'no image'}/>
                    <div className='autocompleteItemText' onClick={() => {
                        changeTeam([...teamAdded, opt])
                    }}>
                        <p>{opt.username}</p>
                        <p>{opt.role}</p>
                    </div>
                </div>)
            }

        })
    }

    return (
        <>
            <div className='closeAutocomplete' onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setAddDropdown(false)
            }}/>

            <div className='autocompleteContainer'>
                    <textarea placeholder='Client' onChange={(e) => {
                        setListBySearch(e.target.value)
                    }}/>
                <button className='clearText' onClick={() => {
                    setListBySearch('')
                }}>x
                </button>
                {renderElements()}

            </div>
        </>
    )
}

export default Autocomplete;
