import React, { useContext } from 'react' 
import FileContext from './FileContext';

function ReloadWidget() { 
    
    const {loadUserFolderHierarchy,reloadBtnText,isReloadBtnDisabled} = useContext(FileContext);

    function onClickReloadButtonHandler(){  
        loadUserFolderHierarchy(true);
        // console.log(JSON.parse(window.localStorage['app-serve-key'])["id"]);
    }

    return (
        <>
            <button className="btn btn-primary mx-2" onClick={onClickReloadButtonHandler} disabled={isReloadBtnDisabled}><i className="bi bi-arrow-clockwise fs-4 me-2"></i>{reloadBtnText}</button>
            
        </>
    )
}

export default ReloadWidget