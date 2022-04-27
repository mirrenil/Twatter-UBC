import { CSSProperties } from 'react';
import { Icon } from '@iconify/react';

interface Props {
    setEdit: () => void;
    deletePost: () => void;
}



const WallPostButtons = ({setEdit, deletePost}: Props) => {
    
    const handleOnEditClick = () => {
        setEdit(); 
    }

    const handleOnDeleteClick = () => {
        deletePost();
    }
        


    return (
        <div style={rootstyle}>
            <button style={buttonStyle} onClick={handleOnEditClick}>
                <Icon icon="ci:edit" style={iconStyle} />
            </button>
            <button style={buttonStyle} onClick={handleOnDeleteClick}>
                <Icon icon="fluent:delete-48-filled" style={iconStyle} />
            </button>
            
        </div>
    )
}

const rootstyle: CSSProperties = {
    display: "flex",
}

const iconStyle: CSSProperties = {
    fontSize: "1.7rem",
}
const buttonStyle: CSSProperties = {
    border: 'none',
    backgroundColor: 'transparent'
}

export default WallPostButtons;

