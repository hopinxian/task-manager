import React from "react";
import { Link } from "react-router-dom";

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            searchTag: "",
            searchTitle: "",
            searchDeadline: "",
            archiveView: false
    };

        this.onChange = this.onChange.bind(this);
        this.changeView = this.changeView.bind(this);
    }

    componentDidMount() {
        const url = "/tasks/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ tasks: response}))
            .catch(() => this.props.history.push("/"));
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    changeView() {
        this.setState((state, props) => ({
            archiveView: !state.archiveView
        }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTag !== this.state.searchTag || prevState.searchTitle !== this.state.searchTitle
            || prevState.searchDeadline !== this.state.searchDeadline || prevState.archiveView !== this.state.archiveView) {
            const url = '/search';
            const { tasks, searchTag, searchTitle, searchDeadline, archiveView } = this.state;
            const body = {
                searchTitle,
                searchDeadline,
                searchTag
            };

            const token = document.querySelector('meta[name="csrf-token"]').content;
            fetch(url, {
                method: "POST",
                headers: {
                    "X-CSRF-Token": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Network response was not ok.");
                })
                .then(response => this.setState({ tasks: response}))
                .catch(error => console.log(error.message));
        }
    }

    render() {
        const { tasks, searchTag, searchTitle, searchDeadline, archiveView} = this.state;
        const allTasks = tasks
            .filter((task, index) => task.completed == archiveView)
            //.filter((task, index) => task.title.includes(searchTitle))
            .map((task, index) => (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{task.title}</td>
                <td>{task.deadline}</td>
                <td>{task.tag}</td>
                <td>
                    <Link to={`/task/${task.id}`} className="btn custom-button">
                        View
                    </Link>
                </td>
            </tr>
        ));
        const noTask = (
            <tr>
                <td colspan = "5" className="align-items-center justify-content-center text-center">
                    <h4>
                        No tasks yet. Why not <Link to="/new_task">create one</Link>
                    </h4>
                </td>
            </tr>
        );
        const currentTaskButton = (
            <button type="button" className="btn custom-button mr-3" onClick={this.changeView}>
                Switch to Current Tasks
            </button>
        )
        const completedTaskButton = (
            <button type="button" className="btn custom-button mr-3" onClick={this.changeView}>
                Switch to Completed Tasks
            </button>
        )

        return (
            <>
                <section className="jumbotron jumbotron-fluid text-center">
                    <div className="container">
                        <h1 className="display-4">Task Manager</h1>
                        <p className="lead">
                            Message of the Day: Work Hard and Work Harder
                        </p>
                    </div>
                </section>
                <div>
                    <main className="container">
                        <div className="text-right mb-3">
                            {archiveView ? currentTaskButton : completedTaskButton}
                            <Link to="/task" className="btn custom-button">
                                Create New Task
                            </Link>
                        </div>

                        <div className="form-group mb-3">
                            <label>Tag Search:</label>
                            <input
                                type="text"
                                name="searchTag"
                                className="form-control"
                                onChange={this.onChange}
                                value={searchTag}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Title Search:</label>
                            <input
                                type="text"
                                name="searchTitle"
                                className="form-control"
                                onChange={this.onChange}
                                value={searchTitle}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Before Deadline:</label>
                            <input
                                type="date"
                                name="searchDeadline"
                                className="form-control"
                                onChange={this.onChange}
                                value={searchDeadline}
                            />
                        </div>
                        <table className="table table-hover table-bordered ">
                            <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Deadline</th>
                                <th scope="col">Tags</th>
                                <th scope="col">Links</th>
                            </tr>
                            </thead>
                            <tbody>
                                {tasks.length > 0 ? allTasks : noTask}
                            </tbody>
                        </table>
                        <Link to="/" className="btn btn-link">
                            Home
                        </Link>
                    </main>
                </div>
            </>
        );
    }

}
export default Tasks;
