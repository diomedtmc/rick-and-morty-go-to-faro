interface Props {
    label: string;
    value: string;
}

const ListItem = (props: Props) => {
    const {
        label,
        value
    } = props;
    return <li><span>{label}: </span>{value}</li>;
}

export default ListItem;
