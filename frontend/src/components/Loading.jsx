import { Stack } from "react-bootstrap";
const Loading = () => {
    return (<Stack className="align-items-center">
        <div className="spinner-border" role="status"></div>
        <p> <strong>loading... </strong></p>
    </Stack>
    );
}

export default Loading;