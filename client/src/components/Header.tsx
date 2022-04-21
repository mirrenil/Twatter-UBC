import LogInComponent from "./LogInComponent";

const Header = () => {
    return <div className="header">
        <h1>Twatter</h1>
        <input type="search" name="search" id="search" placeholder="Search..."/>
        <LogInComponent/>
    
    </div>
};
export default Header;