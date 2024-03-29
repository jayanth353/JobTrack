import { useEffect } from "react";
import { useAppContext } from "../../contexts/appContext.js";
import { StatsContainer, Loading } from "../../components";

const Stats = () => {
    const { showStats, isLoading } = useAppContext();
    useEffect(() => {
        showStats();
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <Loading center />;
    }

    return (
        <>
            <StatsContainer />
        </>
    );
};

export default Stats;
