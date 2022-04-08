import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from "react-redux"
import { getPlay } from "../actions/playAction"
import { getScenes } from "../actions/scenesAction"




const PlaySceneSelector = (props) => {

    const { sceneId } = useParams();
    const { scenes, play, lines, characters } = props;
    useEffect(() => {
        props.getScenes(sceneId);
        props.getPlay(sceneId);
    }, [])
    return (
        <div className="notification is-primary">
            <h1 className="title">{play.name}</h1>

            <div className="level">
                <div className="level-item">
                    <h2 className="subtitle">
                        <div className="select">
                            <select name="scene" value={sceneId} id="" onChange={(e) => { window.location.href = '/scene/' + e.target.value; }}>
                                {scenes?.ids.map((id, index) => {
                                    return (<option key={index} value={id}>{scenes.byIds[id].name}</option>)
                                })
                                }
                            </select>
                        </div>
                    </h2>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        play: state.play,
        scenes: state.scenes,
        lines: state.lines,
        characters: state.characters
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getScenes: (sceneId) => {
            dispatch(getScenes(sceneId));
        },
        getPlay: (sceneId) => {
            dispatch(getPlay(sceneId));
        },
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(PlaySceneSelector);