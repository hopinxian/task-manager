import React from "react";
import { Link } from "react-router-dom";

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
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
            .then(response => this.setState({ tasks: response }))
            .catch(() => this.props.history.push("/"));
    }

    render() {
        const { tasks } = this.state;
        const allTasks = tasks.map((task, index) => (
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
                            <Link to="/task" className="btn custom-button">
                                Create New Task
                            </Link>
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