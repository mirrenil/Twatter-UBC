import { CSSProperties } from "react";

const LogInComponent = () => {
    return (
    <div>
        <button style={buttonStyle}>Sign in!</button>
    </div>
    );
}

const buttonStyle: CSSProperties = {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "1rem",
    fontFamily: 'Permanent Marker',
    transform: "rotate(-0.02turn)"
}
export default LogInComponent;