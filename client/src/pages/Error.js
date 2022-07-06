import { Link } from "react-router-dom";
import img from "../assets/images/PageNotFound.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
    return (
        <Wrapper className="full-page">
            <div>
                <img src={img} alt="404 page not found" />
                <h3>Ohh! page not found</h3>
                <p>We can't seem to find the page you are looking for</p>
                <Link to="/">Back to home</Link>
            </div>
        </Wrapper>
    );
};

export default Error;
