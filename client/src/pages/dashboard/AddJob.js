import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../contexts/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
const AddJob = () => {
    const {
        isLoading,
        isEditing,
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        handleChange,
        clearValues,
        createJob,
        editJob,
    } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!position || !company || !jobLocation) {
            displayAlert();
            return;
        }
        if (isEditing) {
            editJob();
            return;
        }
        createJob();
    };

    const handleJobInput = (e) => {
        handleChange({ name: e.target.name, value: e.target.value });
    };

    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? "edit job" : "add job"} </h3>
                {showAlert && <Alert />}

                {/* position */}
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="position"
                        value={position}
                        handleChange={handleJobInput}
                    />
                    {/* company */}
                    <FormRow
                        type="text"
                        name="company"
                        value={company}
                        handleChange={handleJobInput}
                    />
                    {/* location */}
                    <FormRow
                        type="text"
                        labelText="location"
                        name="jobLocation"
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />

                    <FormRowSelect
                        labelText="job Type"
                        name="jobType"
                        value={jobType}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />

                    <FormRowSelect
                        name="status"
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />

                    <div className="btn-container">
                        <button
                            className="btn btn-block submit-btn"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                        <button
                            className="btn btn-block clear-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                clearValues();
                            }}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;
