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
            <button onClick={handleOnEditClick}>
                <Icon icon="ci:edit" style={iconStyle} />
            </button>
            <button>
                <Icon icon="fluent:delete-48-filled" style={iconStyle} />
            </button>
            
        </div>
    )
}

const iconStyle: CSSProperties = {
    fontSize: "2rem"
}

const rootstyle: CSSProperties = {
    display: "flex",
    
}

export default WallPostButtons;