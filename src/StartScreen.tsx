import './weather-display.css';
import './start-screen.css';
import backgroundSpace from "./backgrounds/background-space.jpg";

interface StartScreenInfo {
    displayStr: string
}

function StartScreen(props: StartScreenInfo): JSX.Element {
    return (
        <div className='start-screen' style={
            { backgroundImage: `url(${backgroundSpace})` }
        }>
            <p className='start-screen__title'>
                {props.displayStr}
                {/* Where<br/>are<br/>you?.. */}
            </p>
        </div>
    );
};

export default StartScreen;