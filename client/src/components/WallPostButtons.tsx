import react, { CSSProperties } from 'react';
import { Icon } from '@iconify/react';

interface Props {
    setEdit: () => void;
}



const WallPostButtons = ({setEdit}: Props) => {

    const handleOnEditClick = () => {
        setEdit();
    }

    return (
        <div style={rootstyle}>
            <button style={buttonStyle} onClick={handleOnEditClick}>
                <Icon icon="ci:edit" style={iconStyle} />
            </button>
            <button style={buttonStyle}>
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