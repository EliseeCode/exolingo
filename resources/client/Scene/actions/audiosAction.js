function getParams() {
    const token = $('.csrfToken').data('csrf-token');
    const params = {
        _csrf: token
    };
    return params;
}
function getCSRF() {
    return $('.csrfToken').data('csrf-token');
}

export function initialLoadAudios(sceneId) {
    let params = { sceneId };
    return dispatch => {
        $.get('/scene/getAudios/' + sceneId, function (data) {
            console.log("data from post", data);
            dispatch({
                type: "LOAD_AUDIO",
                payload: data
            })
        })
    };
}
export function removeAudio(audioId) {
    let params = getParams();
    params = {
        ...params,
        audioId
    };

    return dispatch => {
        $.post('/audio/delete/', params, function (lines) {
            console.log(lines);
            dispatch({
                type: "REMOVE_AUDIO",
                payload: { audioId }
            })
        })
    }
}
export function uploadAudio(lineId, versionId, blob) {
    console.log(lineId, versionId, blob);
    let token = getCSRF();
    var params = new FormData()
    params.append('Blob', blob);
    params.append('lineId', lineId);
    params.append('versionId', versionId);
    params.append('_csrf', token);
    return dispatch => {

        fetch(`/audios`, { method: "POST", body: params })
            .then(response => {
                response.json().then(data => {
                    console.log(data);
                    dispatch({
                        type: "ADD_AUDIO",
                        payload: { audio: data.audio, version: data.version, lineId }
                    })
                })
            })
    }
}
export function setAutoplay(isAutoplay) {
    return {
        type: "SET_AUTOPLAY",
        payload: { isAutoplay: isAutoplay }
    }
}
export function AudioEnded(lineId, lines, isAutoPlay) {
    //getLinePosition
    const linePos = lines.ids.indexOf(lineId) == -1 ? 0 : lines.ids.indexOf(lineId);
    const newLineId = lines.ids[(linePos + 1) % lines.ids.length];
    if (lines.selectedId != lines.ids[lines.ids.length - 1] && isAutoPlay) {
        return {
            type: "PLAY_LINE",
            payload: { lineId: newLineId }
        }
    }
    return {
        type: "AUDIO_REACH_END",
        payload: {}
    }

}

