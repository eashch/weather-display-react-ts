import './weather-display.css';

export interface IconBlockInterface {
    iconPath: string,
    description: string,
    value: number | string,
    sizepx: number,
}

export function IconBlock(props: IconBlockInterface): JSX.Element {
    return (
        <div className="icon-block">
            <img width={props.sizepx}
                height={props.sizepx}
                src={props.iconPath}
                alt={props.description}
            />
            <p>
                {props.value}
            </p>
        </div>
    );
};

export default IconBlock;