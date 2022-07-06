import main from "../assets/images/landing.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                {/* Info section */}
                <div className="info">
                    <h1>
                        Job <span>Tracking</span> App
                    </h1>

                    <p>
                        Unable to track the jobs you applied for ?<br />
                        <span style={{ color: "#246eb9", fontWeight: "bold" }}>
                            Jobtrack
                        </span>{" "}
                        is the right place where u can keep track of jobs you
                        have applied and provides user-friendly dashboard with
                        stats for easy tracking
                    </p>
                    <Link to="/register" className="btn btn-hero">
                        Login/Register
                    </Link>
                </div>
                <img src={main} alt="Job hunt" className="img main-img" />
            </div>
        </Wrapper>
    );
};

export default Landing;
