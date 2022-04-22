import react, { CSSProperties } from 'react';
import { Icon } from '@iconify/react';




const WallPostButtons = () => {
    return (
        <div style={rootstyle}>
            <Icon icon="ci:edit" style={iconStyle} />
            <Icon icon="fluent:delete-48-filled" style={iconStyle} />
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