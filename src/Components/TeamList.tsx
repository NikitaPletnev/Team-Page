import React, {useEffect, useState} from 'react';
import '../Styles/teamList.css'
import '../data/data'
import {data} from "../data/data";
import {DataInterface} from "../Interfaces/DataInterface";
import Autocomplete from "./Autocomplete";

const TeamList = () => {

    const [teamData, setTeamData] = useState<DataInterface[] | null>();
    const [teamAdded, setTeamAdded] = useState<DataInterface[]>([])
    const [seeMore, setSeeMore] = useState(false);
    const [addDropdown, setAddDropdown] = useState(false);

    useEffect(() => {
        setTeamData(data)
        if (localStorage.getItem('teamAdded')) {
            setTeamAdded(JSON.parse(localStorage.getItem('teamAdded') as string))
        }
    }, []);

    const changeTeam = (team: DataInterface[]): void => {
        setTeamAdded(team);
        localStorage.setItem('teamAdded', JSON.stringify(team))
    }

    const renderAddMemberEl = () => {
        return (
            <div className={`memberContainer addUser ${addDropdown ? 'addDropdown' : ''}`} onClick={() => {
                setAddDropdown(true)
            }}>
                {renderAddMemberElContent()}
            </div>
        )
    }

    const renderAddMemberElContent = () => {
        return (
            <>
                <div className='addUserIcon memberIcon'/>
                <div className='memberText'>
                    <p>Add team member to this test</p>
                </div>
                {addDropdown && <Autocomplete teamData={teamData} setAddDropdown={setAddDropdown} teamAdded={teamAdded}
                                              changeTeam={changeTeam}/>}
            </>
        )
    }

    const renderMemberEl = (opt: DataInterface) => {
        return (
            <div key={opt.username} className='memberContainer addedUser'>
                <div className='addedUserIcon' onClick={() => {
                    changeTeam(teamAdded.filter((el) => el.username !== opt.username))
                }}>
                    <img title='Remove User' className='memberIcon' src={require(`../Icons/${opt.picture}`)}
                         alt={'no image'}/>
                </div>
                <div className='memberText'>
                    <p>{opt.role}</p>
                    <p>{opt.username}</p>
                </div>
            </div>
        )
    }

    const renderEls = () => {
        if (!teamAdded) {
            return null
        }
        return (
            <>
                {teamAdded?.map((opt, index) => {
                    return seeMore ? renderMemberEl(opt) : (index < 5 && renderMemberEl(opt))
                })}
                {teamAdded?.length > 5 && <button className='seeMoreButton' onClick={() => {
                    setSeeMore(!seeMore)
                }}>{`See ${seeMore ? 'Less' : 'More'}`}</button>}
            </>
        )
    }

    const renderContent = () => {
        return (
            <>
                {renderAddMemberEl()}
                {renderEls()}
            </>
        )
    }

    return (
        <div className='teamList'>
            {renderContent()}
        </div>
    )
}

export default TeamList;
