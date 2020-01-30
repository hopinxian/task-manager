import React from "react";
import { Link } from "react-router-dom";

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = { task: { title: "" } };

        this.addHtmlEntities = this.addHtmlEntities.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    componentDidMount() {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        const url = `/show/${id}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ task: response }))
            .catch(() => this.props.history.push("/taskslist"));
    }

    addHtmlEntities(str) {
        return String(str)
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }

    deleteTask() {
        const {
            match: {
                params: { id }
            }
        } = this.props;
        const url = `/destroy/${id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(() => this.props.history.push("/taskslist"))
            .catch(error => console.log(error.message));
    }

    render() {
        const { task } = this.state;

        const taskDetails = (
            <div>
                <li className="list-group-item">
                    Deadline: {task.deadline}
                </li>
                <li className="list-group-item">
                    Tags: {task.tag}
                </li>
            </div>
        )
        const taskInstruction = this.addHtmlEntities(task.description);

        return (
            <div>
                <div className="hero position-relative d-flex align-items-center justify-content-center">
                    <div className="overlay bg-dark position-absolute" />
                    <h1 className="display-4 position-relative text-white">
                        {task.title}
                    </h1>
                </div>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-sm-12 col-lg-3">
                            <ul className="list-group list-group-flush">
                                {taskDetails}
                            </ul>
                        </div>
                        <div className="col-sm-12 col-lg-7">
                            <h5 className="mb-2">Task Instruction</h5>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `${taskInstruction}`
                                }}
                            />
                        </div>
                        <div className="col-sm-12 col-lg-2">
                            <Link to={`/editTask/${task.id}`} className="btn custom-button mb-4">
                                Edit Task
                            </Link>
                            <button type="button" className="btn btn-danger" onClick={this.deleteTask}>
                                Complete Task
                            </button>
                        </div>
                    </div>
                    <Link to="/taskslist" className="btn btn-link">
                        Back to tasks list
                    </Link>
                </div>
            </div>
        );
    }

}

export default Task;
